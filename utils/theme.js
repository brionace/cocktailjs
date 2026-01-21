// Theme shim used by SSR renderer and components. Provides a minimal
// design-system-shaped `theme.colors` object expected by many assets.
const theme = {
  colors: {
    accent: { 200: "#ffd180", 500: "#e67e22" },
    warning: "#ffb300",
    success: "#4caf50",
    error: "#e53935",
    dark: { 400: "#616161", 700: "#212121", 900: "#121212" },
  },
};

function getStrokeColor() {
  return "currentColor";
}

try {
  global.theme = theme;
} catch (e) {}

module.exports = {
  theme,
  getStrokeColor,
  default: { theme, getStrokeColor },
};
