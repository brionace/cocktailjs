# cocktailjs-react

Lightweight React components for rendering cocktail glasses and liquids as SVG.

## Installation

Install the package and ensure `react` is available as a peer dependency in your app:

```bash
pnpm add cocktailjs-react
# or
npm install cocktailjs-react
```

## Basic usage

Import components from the package and use them like standard React components.

```jsx
import React from "react";
import { MartiniGlass } from "cocktailjs-react";

export default function Example() {
  return (
    <div>
      <MartiniGlass size={200} liquidFill={["#f6d365", "#fda085"]} />
    </div>
  );
}
```

## Props

- `size` (number): width/height in pixels for glass components.
- `liquidFill` (string | string[]): color or gradient colors used for the liquid.
- `level` (number): for `Liquid`, fill level from `0` (empty) to `1` (full).
- `highlight` (boolean): for `Liquid`, enable a highlight overlay.
- `highlightColor` (string): color used for the highlight.
- `stopPositions` (array): optional gradient stop offsets for `Liquid`.

- `mixed` (boolean): render a visually-mixed liquid. Subdues strong gradients and biases toward a dominant color while still hinting original colors.
- `mixedBlend` (number 0..1): how much original colors remain when `mixed` is true (0 = pure dominant color, 1 = original colors). Default ~0.25.
- `mixedOpacity` (number 0..1): opacity applied to synthesized mixed gradient stops (default ~0.85).

Notes about `mixed` vs gradients

- When `mixed` is `true`, `Liquid` will choose a dominant color (highest saturation) and blend other stops toward it, reducing stop opacity so hints of the original palette remain. This produces a more natural "already mixed" appearance.

## Notes

- `react` and `react-dom` are peer dependencies — install them in your application to avoid duplicate React instances.
- All components render SVG and accept standard SVG attributes (className, style, etc.).

If you need more examples or integration help, open an issue in the repository.
