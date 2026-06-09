const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const playwrightPlugin = require('eslint-plugin-playwright');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules/**', 'reports/**', 'playwright-report/**', 'test-results/**'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
      globals: { ...globals.node },
    },
    plugins: { '@typescript-eslint': tsPlugin, playwright: playwrightPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...playwrightPlugin.configs['flat/recommended'].rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Conditional skip guards (live-env self-skipping) and test.fixme scaffolds
    // are intentional across the test tree.
    files: ['tests/**/*.spec.ts'],
    rules: {
      'playwright/no-skipped-test': 'off',
    },
  },
  {
    // Generated SEATC scaffolds (test.fixme): steps are documented but not yet
    // implemented, so they legitimately have no assertions yet.
    files: ['tests/regression/**/*.spec.ts'],
    rules: {
      'playwright/expect-expect': 'off',
      'playwright/consistent-spacing-between-blocks': 'off',
    },
  },
];