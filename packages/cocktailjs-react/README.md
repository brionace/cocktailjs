# cocktailjs-react

Lightweight React components for rendering cocktail glasses and liquids as SVG.

This package exports React components (SVG) for a variety of glasses and a `Liquid` helper used to render fills.

**Installation**

Install the package and add React as a peer dependency:

```bash
pnpm add cocktailjs-react
# or
# npm install cocktailjs-react
```

Note: `react` and `react-dom` are peer dependencies; install them in your app if not present.

**Basic usage**

```jsx
import React from "react";
import { WhiskeyShotGlass, Liquid } from "cocktailjs-react";

export default function Example() {
  return (
    <div>
      <WhiskeyShotGlass size={120} liquidFill={["#b5651d", "#8b4513"]} />
      <Liquid level={0.6} highlight highlightColor="#fff" />
    </div>
  );
}
```

You can also import any glass component directly:

```jsx
import { MartiniGlass } from "cocktailjs-react";
<MartiniGlass size={200} liquidFill={["#f6d365", "#fda085"]} />;
```

**`Liquid` props**

- `level` (number): fill level 0..1
- `highlight` (boolean): adds highlight overlay
- `highlightColor` (string): color for the highlight
- `stopPositions` (array): gradient stop offsets

**Development / Playground**

This repository includes a Vite playground (in `playground/`) that runs on port 5173. To run the playground locally from the repo root:

```bash
pnpm install
pnpm run dev:with-playground
# Admin server runs at http://localhost:3004 and playground at http://localhost:5173
```

**Build & publish**

The package includes esbuild-based scripts to generate ESM and CJS bundles into `dist/`.

```bash
pnpm --filter ./packages/cocktailjs-react run build
pnpm --filter ./packages/cocktailjs-react run build:cjs
# or publish (prepare script runs build):
pnpm publish --filter ./packages/cocktailjs-react
```

**Notes**

- The package exposes both ESM (`dist/index.mjs`) and CJS (`dist/index.cjs.js`) bundles.
- Keep `react` as a peer dependency to avoid duplicate React instances in consumer apps.

If you need help integrating the components or want additional examples, open an issue or request an example in the repo.


#####
cd packages/cocktailjs-react

# Option A — inline prompt (recommended so token isn't in shell history):
read -s -p "NPM token: " NPM_TOKEN; echo

# write temporary project-local .npmrc
printf "//registry.npmjs.org/:_authToken=%s\n" "$NPM_TOKEN" > .npmrc

# build and publish
pnpm run prepare
npm publish --access public

# remove the temporary file
rm -f .npmrc
unset NPM_TOKEN