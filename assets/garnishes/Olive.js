import React from "react";
import Svg, { Ellipse, Line } from "react-native-svg";

export default function Olive({ x = 50, y = 10, scale = 1 }) {
  return (
    <Svg
      width={16 * scale}
      height={16 * scale}
      viewBox="0 0 20 20"
      style={{ position: "absolute", left: x, top: y }}
    >
      <Ellipse
        cx={10}
        cy={10}
        rx={7}
        ry={5}
        fill="olive"
        stroke="darkgreen"
        strokeWidth={1}
      />
      <Ellipse cx={10} cy={10} rx={2} ry={2} fill="red" />
      {/* Toothpick */}
      <Line x1="0" y1="0" x2="20" y2="20" stroke="brown" strokeWidth={1} />
    </Svg>
  );
}
