#!/usr/bin/env bash
set -euo pipefail

echo "=== Blog Harness Verification ==="
echo "cwd: $(pwd)"
echo "test command: no npm test script yet; using build and diff checks as verification"

echo "=== npm run build ==="
npm run build

echo "=== git diff --check ==="
git diff --check

echo "=== Verification Complete ==="
echo "Next: update feature_list.json, progress.md, and session-handoff.md with evidence."
