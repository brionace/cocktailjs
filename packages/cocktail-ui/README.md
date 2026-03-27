# cocktail-ui

Minimal UI utilities and components package for CocktailJS.

This package exposes SVG assets and helper methods for querying those assets.

## Available Glasses

Primary glass asset names:

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

Additional legacy/alias SVG filenames currently present:

- Highball
- Coupe
- ShotGlass

## Usage

Require the package:

```js
const cocktailUI = require("@bace51/cocktail-ui");
console.log(cocktailUI.name);
```

## Methods Accepted

- `list()`
  - Returns: `string[]`
  - Description: lists all asset keys available in the generated assets map.

- `listByType(type)`
  - Args:
    - `type` (string): asset type prefix such as `"glasses"`.
  - Returns: `string[]`
  - Description: lists keys matching the provided type prefix.

- `getSvg(name, type)`
  - Args:
    - `name` (string): full key (`"glasses/MartiniGlass"`) or short name (`"MartiniGlass"`).
    - `type` (string, optional): type prefix helper (`"glasses"`, etc.).
  - Returns: `string | null`
  - Description: returns raw SVG string for the matching key, or `null` when unavailable.

- `get(name, type)`
  - Args: same as `getSvg(name, type)`.
  - Returns: `string | null`
  - Description: convenience alias for `getSvg`.

## Exports / Properties

- `name` (string): package identifier metadata.
- `version` (string): package version metadata.
- `assets` (object | null): generated assets map when available; can be `null` before prepare/build.

License: MIT
