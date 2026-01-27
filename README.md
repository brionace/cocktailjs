# cocktailjs — developer guide

This repository contains SVG assets and a small React component package (`packages/cocktailjs-react`) used to render cocktail glasses and liquids.

Purpose: make it easy for contributors to run the project locally, iterate on SVGs and React components, and test visuals with a small playground.

## Prerequisites

- Node.js (LTS) and npm or pnpm (recommended).
- Core tooling: `pnpm` (Corepack can be used to enable pnpm).

## Quick start (developer)

1. Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd cocktailjs
pnpm install
```

2. Start the development environment (watchers + playground):

```bash
pnpm run dev:with-playground
```

This runs asset watchers and a Vite-based playground at http://localhost:5173 where you can preview components and tweak props interactively.

## Working on components

- React source is under `packages/cocktailjs-react/src`.
- SVG source and assets live in `assets/` and are used to generate rendered SVGs in `public/svgs` via helper scripts.
- To rebuild SVG exports after editing assets:

```bash
node scripts/render-components-to-svgs.cjs
```

## Build & test

- Build the React package (produces `dist/`):

```bash
pnpm --filter ./packages/cocktailjs-react run build
```

- Run playground against the built bundle (production-like):

```bash
USE_DIST=1 pnpm --filter ./packages/cocktailjs-react run dev
```

## Contributing

- Make a branch per change: `git checkout -b feat/my-change`.
- Keep commits focused and add tests or a playground example when appropriate.
- Open a PR against `master` with a clear description and screenshots if the change affects visuals.

## Publishing (maintainers)

- The project includes a GitHub Actions workflow to publish `packages/cocktailjs-react` on tag pushes.
- For CI publishing you will need a npm Automation token with **Publish** and **Bypass 2FA** enabled stored in the repository Secrets as `NPM_TOKEN`.

## Questions or issues

Open an issue on the repository for feature requests, bug reports, or general help.

---

If you'd like, I can also:

- Add a CONTRIBUTING.md with a minimal PR checklist and commit message template.
- Add a small developer `Makefile` or npm scripts for common tasks (build, watch, playground).
