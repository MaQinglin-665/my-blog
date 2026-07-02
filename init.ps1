$ErrorActionPreference = "Stop"

Write-Host "=== Blog Harness Verification ==="
Write-Host "cwd: $(Get-Location)"
Write-Host "test command: no npm test script yet; using build and diff checks as verification"

Write-Host "=== npm run build ==="
npm run build

Write-Host "=== git diff --check ==="
git diff --check

Write-Host "=== Verification Complete ==="
Write-Host "Next: update feature_list.json, progress.md, and session-handoff.md with evidence."
