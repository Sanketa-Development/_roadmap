# Sanketa roadmap

Public website: https://sanketa-development.github.io/_roadmap/

This repository is the `_roadmap` submodule in the Sanketa development workspace.
The default view is Sanketa (bgfx / ZFLauncher). The historical Tantra-O roadmap
remains available through its selector. The separate `_docs` repository is private.
Only the roadmap assets and its cited plan/evidence snapshots are published here.

## Publish

Push `main`. `.github/workflows/pages.yml` publishes the static website using
GitHub Actions; repository Settings > Pages must use **GitHub Actions**.
There is no npm build or Jekyll processing. Relative paths work under `/_roadmap/`.

## Refresh and check

Update the authored snapshots in `reference/`, then run:

```powershell
python tools/update-roadmap.py
node tools/check-roadmap.cjs
node tools/check-rendered-content.cjs
```

From the main workspace, `python _roadmap/tools/update-roadmap.py --bgfx-root
_client/source` refreshes the bgfx snapshots. Keep private captures, saves and
credentials out of this public repository. Record component and visual acceptance
separately; checked task counts do not establish overall gameplay completion.
