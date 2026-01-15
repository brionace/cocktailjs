import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export default function Cherry({ x = 48, y = 12, scale = 1 }) {
  return (
    <Svg
      width={16 * scale}
      height={16 * scale}
      viewBox="0 0 20 20"
      style={{ position: "absolute", left: x, top: y }}
    >
      {/* Stem */}
      <Path
        d="M10 0 C12 4, 8 6, 10 10"
        stroke="green"
        strokeWidth={1}
        fill="none"
      />
      {/* Fruit */}
      <Circle
        cx={10}
        cy={14}
        r={5}
        fill="red"
        stroke="darkred"
        strokeWidth={1}
      />
    </Svg>
  );
}
