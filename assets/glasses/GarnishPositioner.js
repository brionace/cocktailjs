import React from "react";
// Minimal GarnishPositioner shim used during SSR rendering to avoid complex layout logic.
export default function GarnishPositioner({ glass, name }) {
  // For rendering the glass SVG we don't need to position real garnish here.
  // Return null so the renderer continues. If you want a small marker, return a tiny circle.
  return null;
}
