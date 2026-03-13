# cocktailjs-reactnative

React Native SVG components for rendering cocktail glasses and liquids.

## Installation

```bash
npm install @bace51/cocktailjs-reactnative react-native-svg
```

## Usage

```jsx
import { MartiniGlass, RocksGlass } from "@bace51/cocktailjs-reactnative";

export default function App() {
  return (
    <>
      <MartiniGlass size={80} liquidFill={["#ff6b6b", "#ee5a24"]} />
      <RocksGlass size={80} liquidFill="#c0a46b" />
    </>
  );
}
```

## Components

All glass components accept:

- `size` — width in pixels (default: 80)
- `liquidFill` — string or array of colors for the liquid gradient
- `strokeWidth` — stroke width for glass outlines (default: 0.5)

## License

MIT
