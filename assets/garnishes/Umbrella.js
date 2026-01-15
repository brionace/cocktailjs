import React from "react";
import Svg, { Path, Line } from "react-native-svg";

export default function Umbrella({ x = 44, y = 2, scale = 1 }) {
  return (
    <Svg
      width={24 * scale}
      height={24 * scale}
      viewBox="0 0 24 24"
      style={{ position: "absolute", left: x, top: y }}
    >
      {/* Canopy */}
      <Path
        d="M2 12 Q6 4, 12 12 Q18 4, 22 12 Z"
        fill="pink"
        stroke="red"
        strokeWidth={1}
      />
      {/* Stick */}
      <Line x1="12" y1="12" x2="12" y2="22" stroke="brown" strokeWidth={2} />
    </Svg>
  );
}
