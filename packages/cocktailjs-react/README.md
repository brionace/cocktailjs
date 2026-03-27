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

## Available Glasses

- AbsintheGlass
- BrandySnifterGlass
- CollinsGlass
- CopperMug
- CordialGlass
- CoupeGlass
- DemitasseGlass
- DoubleShotGlass
- FizzGlass
- FluteGlass
- GobletGlass
- HighballGlass
- HurricaneGlass
- IrishCoffeeGlass
- JulepCup
- MargaritaGlass
- MartiniGlass
- NickAndNoraGlass
- ParfaitGlass
- PilsnerGlass
- PintGlass
- PousseCafeGlass
- PunchGlass
- RocksGlass
- SingleShotGlass
- SlingGlass
- SnifterGlass
- SourGlass
- TankardGlass
- TikiGlass
- ToddyGlass
- WhiskeyShotGlass
- WineGlass

## Props Accepted

Glass component props (all glasses):

- `size` (number): rendered width/height. Default is usually `80` (some shot variants default to `64`).
- `liquidFill` (string | string[]): liquid color or gradient stops.
- `strokeWidth` (number): outline stroke width.

Glass component props (supported by specific glasses):

- `idBase` (string): base id used for internal liquid gradient ids.
- `garnish` (any): accepted by some glass components (for example `MartiniGlass`, `HurricaneGlass`, `NickAndNoraGlass`, `PintGlass`).
- `fill` (string): accepted by non-liquid metal/body components (for example `CopperMug`, `JulepCup`).

Glass component passthrough:

- `WhiskeyShotGlass` forwards additional props to `Liquid` via rest props (`...liquidProps`).

Liquid component props (`Liquid` export):

- `d` (string): SVG path data for liquid shape.
- `transform` (string): optional SVG transform applied to the liquid path.
- `liquidFill` (string | string[] | null): fallback liquid color input.
- `liquidStyle` (object | null): explicit style object for the liquid path.
- `gradientAttr` (string | string[] | null): external gradient id (`#id`) or gradient stop colors.
- `opacity` (number): liquid opacity. Default `0.7`.
- `idBase` (string): gradient id base. Default `"liquidGrad"`.
- `highlight` (`"liquid" | "ice" | "all" | null`): highlight mode.
- `highlightColor` (string): highlight stop color. Default `"#fff7c0"`.
- `level` (number `0..1`): vertical fill level. Default `1`.
- `stopPositions` (number[] | null): explicit normalized stop offsets (`0..1`).
- `mixed` (boolean): blend gradient toward dominant color.
- `mixedBlend` (number `0..1`): original-color retention when mixed. Default `0.25`.
- `mixedOpacity` (number `0..1`): opacity for synthesized mixed gradient stops. Default `0.85`.

## Methods / Exports

- No class-style methods are exposed; this package exports React components and data.
- Named exports: `Liquid`, all glass components listed above, and `glasses`.
- `glasses` export: array of `{ name, about }` metadata entries.
- Default export: object containing `Liquid`, all glass components, and `glasses`.

## Notes

- `react` and `react-dom` are peer dependencies — install them in your application to avoid duplicate React instances.
- All components render SVG and accept standard SVG attributes (className, style, etc.).

If you need more examples or integration help, open an issue in the repository.
