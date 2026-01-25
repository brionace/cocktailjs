# cocktailjs export

This folder is an export of the assets and build tooling for glasses.

Next steps:

1. Create a new git repo (cocktailjs) and copy these files into it, or push this folder as the initial commit.
2. Run `pnpm install` and `pnpm run build` to verify the package builds.
3. Update CI to publish the package (or deploy assets to a CDN).

# run the patch (if you change the script)

node scripts/patch-glasses-liquids.js

# rebuild svgs (regenerates .tmp_render from assets and writes public/svgs)

node scripts/render-components-to-svgs.cjs

# quick validation

node scripts/check-manifest-svgs.js

<!-- Steps to publish to npm -->

# init npm in order to publish

<!-- https://docs.npmjs.com/creating-and-publishing-private-packages -->

npm init --scope=@bace51

cd packages/cocktail-ui
pnpm version patch # or minor/major, updates package.json and creates a git tag

# from repo root or package folder

pnpm run prepare # runs node ../../scripts/export-svgs-to-package.js
pnpm run build # builds dist/index.\* via esbuild

# create a tarball to inspect what will be published

pnpm pack
tar -tzf <generated-tarball>.tgz

# from packages/cocktail-ui

pnpm publish --access public

# Or

pnpm --filter ./packages/cocktail-ui... publish --access public

# very package on npm

const pkg = require('@bace51/cocktail-ui');
console.log(Object.keys(pkg.assets || {}));

# export to packages - react

pnpm run export:react

# stop any running dev processes and re-run:

pnpm run dev:with-playground

#

pnpm -w -s --silent test || true

# one-shot sync

node scripts/sync-assets.js

# continuous watch mode (recommended during development)

pnpm run sync:assets:watch

# regenrate artifacts

pnpm run render:svgs

# Rebuild package bundles / exports:

pnpm run export:react

# Start live-sync watchers:

pnpm run sync:assets:watch
pnpm run dev:with-playground


## CI Publishing (recommended)

This repository includes a GitHub Actions workflow that will publish `packages/cocktailjs-react` when you push a tag like `v1.2.3` or trigger the workflow manually.

Steps to enable automated publishing:

1. Create an npm Automation Token on https://www.npmjs.com/settings/<your-username>/tokens — choose **Automation** and enable **Publish** and **Bypass 2FA** if your account requires 2FA.
2. In your GitHub repository, go to Settings → Secrets → Actions and add a new secret named `NPM_TOKEN` with the token value.
3. Create a tag and push it to trigger publishing:

```bash
git tag v1.0.2
git push origin v1.0.2
```

The workflow will run, build `packages/cocktailjs-react`, and publish to npm using the `NPM_TOKEN` secret. Do NOT commit tokens to the repository.

