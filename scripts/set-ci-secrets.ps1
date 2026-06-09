<#
.SYNOPSIS
  Set the GitHub Actions secrets for this repo from the local .env, via the gh CLI.

.DESCRIPTION
  Reads BASE_URL / API_BASE_URL / ADMIN_USER / ADMIN_PASS from the gitignored
  .env and pushes them as repository secrets with `gh secret set`. Secret VALUES
  are never printed and are not hard-coded in this script (safe to commit).

  API_TOKEN is NOT read from .env (it's blank there and tokens are minted on
  demand). Mint a fresh one in the app (User Actions > Profile > Add Token > copy
  the one-time value) and pass it via -ApiToken to enable the read-only live job.

.PREREQUISITES
  - gh CLI installed and authenticated:  gh auth login
  - Run from anywhere; defaults assume this repo/.env layout.

.EXAMPLE
  # Read-only live job (API base + a freshly minted token):
  ./scripts/set-ci-secrets.ps1 -ApiToken 'qU8H...minted...'

.EXAMPLE
  # Also stage the full-live secrets (only used once that job is uncommented):
  ./scripts/set-ci-secrets.ps1 -ApiToken 'qU8H...' -IncludeFullLive
#>
[CmdletBinding()]
param(
  [string]$Repo = 'thomasgiaquinto-TR/seacms',
  [string]$EnvFile = (Join-Path $PSScriptRoot '..\.env'),
  [string]$ApiToken,
  [switch]$IncludeFullLive
)

$ErrorActionPreference = 'Stop'

# --- preflight: gh present + authenticated ---
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw "gh CLI not found. Install it and run 'gh auth login' first."
}
gh auth status 1>$null 2>$null
if (-not $?) { throw "gh is not authenticated. Run 'gh auth login' first." }

# --- parse .env into a hashtable (KEY=VALUE, ignoring comments/blanks) ---
if (-not (Test-Path $EnvFile)) { throw ".env not found at: $EnvFile" }
$envVars = @{}
foreach ($line in Get-Content $EnvFile) {
  $t = $line.Trim()
  if ($t -eq '' -or $t.StartsWith('#') -or ($t -notmatch '=')) { continue }
  $idx = $t.IndexOf('=')
  $envVars[$t.Substring(0, $idx).Trim()] = $t.Substring($idx + 1).Trim()
}

function Set-Secret([string]$Name, [string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) { Write-Host "  skip $Name (empty)"; return }
  # --body keeps the exact value (stdin piping would append a newline and corrupt
  # tokens). The value is passed as a variable, never echoed by this script.
  gh secret set $Name --repo $Repo --body $Value
  if ($?) { Write-Host "  set  $Name" } else { Write-Host "  FAIL $Name" }
}

Write-Host "Setting Actions secrets on $Repo ..."

# Read-only live job
Set-Secret 'API_BASE_URL' $envVars['API_BASE_URL']
if ($PSBoundParameters.ContainsKey('ApiToken')) {
  Set-Secret 'API_TOKEN' $ApiToken
} else {
  Write-Host "  skip API_TOKEN (pass -ApiToken '<freshly minted token>' to enable the read-only live job)"
}

# Full-live job (only consumed once that workflow job is uncommented)
if ($IncludeFullLive) {
  Set-Secret 'BASE_URL'   $envVars['BASE_URL']
  Set-Secret 'ADMIN_USER' $envVars['ADMIN_USER']
  Set-Secret 'ADMIN_PASS' $envVars['ADMIN_PASS']
}

Write-Host "Done. Verify with:  gh secret list --repo $Repo"
