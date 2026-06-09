/**
 * Generate one Playwright spec per SEATC test case from the extracted test plan.
 *
 * Input : testplan/SEATC_testplan.txt  (flattened text of SEATC_final_testplan.docx)
 * Output: tests/regression/<suite-slug>/SEATC-<id>-<title-slug>.spec.ts
 *         + testplan/testcases.json   (parsed structured form, for review)
 *
 * Generated specs are test.fixme scaffolds: every documented Action is a
 * test.step with the Expected Result captured as a comment. They are skipped at
 * runtime (won't false-fail) and are meant to be fleshed out against the live
 * app using the shared helpers/page-objects. Cases listed in HAND_WRITTEN are
 * skipped here because a verified, active spec already exists.
 *
 * Re-run with:  node scripts/generate-specs.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'testplan', 'SEATC_testplan.txt');
const OUT_DIR = path.join(ROOT, 'tests', 'regression');

// Cases that already have a hand-written, verified active spec — do not generate.
const HAND_WRITTEN = new Set([
  '27441', '755', '28234', '33993', '34072', '34027', '28156', '28161', '27681', '28145',
  '39558', '840', '31901', '27872',
]);

const MARKERS = new Set(['Summary', 'Preconditions', '#', 'Action', 'Expected Result']);

function slug(s) {
  return s
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'misc';
}

function safeComment(s) {
  return s.replace(/\*\//g, '* /');
}

function parse(text) {
  const rawLines = text.split(/\r?\n/);
  const lines = rawLines.map((l) => l.trim());

  const cases = [];
  let cur = null;
  let suiteBuffer = [];
  let currentSuite = '';
  let mode = 'none'; // none | summary | preconditions | steps
  let sub = 'idle'; // idle | awaitAction | awaitExpected
  let step = null;

  const pushStep = () => {
    if (step) {
      cur.steps.push(step);
      step = null;
    }
  };
  const finalizeCase = () => {
    pushStep();
    if (cur) cases.push(cur);
    cur = null;
  };

  for (const line of lines) {
    if (!line) continue;

    const seatc = line.match(/^SEATC-(\d+)\s+(.+)$/);
    if (seatc) {
      finalizeCase();
      if (suiteBuffer.length) currentSuite = suiteBuffer.join(' > ');
      suiteBuffer = [];
      cur = {
        id: seatc[1],
        title: seatc[2].trim(),
        suite: currentSuite,
        summary: '',
        preconditions: '',
        steps: [],
      };
      mode = 'caseHeader';
      sub = 'idle';
      continue;
    }

    if (line === 'Summary') { mode = 'summary'; continue; }
    if (line === 'Preconditions') { mode = 'preconditions'; continue; }
    if (line === '#') { mode = 'steps'; sub = 'idle'; continue; }
    if (line === 'Action' || line === 'Expected Result') continue;

    // Step number begins a new step.
    if (mode === 'steps' && /^\d+$/.test(line)) {
      pushStep();
      step = { n: line, action: '', expected: '' };
      sub = 'awaitAction';
      continue;
    }

    // Content line handling.
    if (!cur) {
      // Heading text before/between cases.
      suiteBuffer.push(line);
      continue;
    }

    if (mode === 'summary') {
      cur.summary = cur.summary ? cur.summary + ' ' + line : line;
      continue;
    }
    if (mode === 'preconditions') {
      cur.preconditions = cur.preconditions ? cur.preconditions + ' ' + line : line;
      continue;
    }
    if (mode === 'steps') {
      if (sub === 'awaitAction') { step.action = line; sub = 'awaitExpected'; continue; }
      if (sub === 'awaitExpected') { step.expected = line; pushStep(); sub = 'idle'; continue; }
      // mode steps, idle, content that is not a number => the case ended; heading.
      finalizeCase();
      mode = 'none';
      suiteBuffer = [line];
      continue;
    }

    // caseHeader/none with stray content => treat as heading start of next group.
    finalizeCase();
    mode = 'none';
    suiteBuffer = [line];
  }
  finalizeCase();
  return cases;
}

function wrapComment(label, body) {
  if (!body) return [];
  const words = body.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > 100) { lines.push(line.trim()); line = w; }
    else line += ' ' + w;
  }
  if (line.trim()) lines.push(line.trim());
  return [` * ${label}:`, ...lines.map((l) => ` *   ${safeComment(l)}`)];
}

function specFor(tc) {
  const rel = '../../..';
  const header = [
    `import { test } from '${rel}/fixtures';`,
    '',
    '/**',
    ` * SEATC-${tc.id}  ${safeComment(tc.title)}`,
    ` * Suite: ${safeComment(tc.suite) || 'Unsorted'}`,
    ...(tc.summary ? wrapComment('Summary', tc.summary) : []),
    ...(tc.preconditions ? [' *', ...wrapComment('Preconditions', tc.preconditions)] : []),
    ' *',
    ' * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test',
    ' * plan. Implement the actions/assertions against the live app; remove .fixme',
    ' * once green. Some steps need config changes, multiple users, or external',
    ' * tools (Swagger/Postman) as noted in Preconditions.',
    ' */',
  ];

  const steps = tc.steps.length
    ? tc.steps
        .map((s) => {
          const name = `${s.n}. ${safeComment(s.action).replace(/'/g, "\\'")}`;
          const expected = s.expected
            ? `      // Expected: ${safeComment(s.expected)}`
            : '      // Expected: (not specified)';
          return [
            `    await test.step('${name}', async () => {`,
            expected,
            '      // TODO: implement step',
            '    });',
          ].join('\n');
        })
        .join('\n')
    : "    // No discrete steps were documented for this case in the test plan.";

  const body = [
    ...header,
    `test.describe('SEATC-${tc.id}', () => {`,
    `  test.fixme('SEATC-${tc.id} ${safeComment(tc.title).replace(/'/g, "\\'")}', async ({ loginHelper }) => {`,
    '    await loginHelper.loginAsAdmin();',
    steps,
    '  });',
    '});',
    '',
  ].join('\n');

  return body;
}

function main() {
  const text = fs.readFileSync(SRC, 'utf8');
  const cases = parse(text);

  fs.writeFileSync(
    path.join(ROOT, 'testplan', 'testcases.json'),
    JSON.stringify(cases, null, 2),
    'utf8',
  );

  let written = 0;
  const seen = new Set();
  for (const tc of cases) {
    if (seen.has(tc.id)) continue;
    seen.add(tc.id);
    if (HAND_WRITTEN.has(tc.id)) continue;

    const dir = path.join(OUT_DIR, slug(tc.suite.split(' > ').pop() || tc.suite));
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `SEATC-${tc.id}-${slug(tc.title)}.spec.ts`);
    fs.writeFileSync(file, specFor(tc), 'utf8');
    written++;
  }

  console.log(`Parsed ${cases.length} cases (${seen.size} unique).`);
  console.log(`Generated ${written} spec files under tests/regression/.`);
  const suites = [...new Set(cases.map((c) => c.suite.split(' > ').pop()))];
  console.log(`Suites (${suites.length}):`);
  suites.forEach((s) => console.log('  - ' + s));
}

main();