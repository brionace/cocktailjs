// ESM theme utilities for the React package
export const theme = {
  colors: {
    accent: { 200: "#ffd180", 500: "#e67e22" },
    warning: "#ffb300",
    success: "#4caf50",
    error: "#e53935",
    dark: { 400: "#616161", 700: "#212121", 900: "#121212" },
  },
};

export function getStrokeColor() {
  return "currentColor";
}

// also set on global for SSR scripts that expect it
try {
  // eslint-disable-next-line no-undef
  global.theme = theme;
} catch (e) {}
