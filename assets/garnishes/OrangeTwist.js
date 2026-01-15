import React from "react";
import Svg, { Path } from "react-native-svg";

export default function OrangeTwist({
  x = 48,
  y = 8,
  scale = 1,
  color = "orange",
}) {
  return (
    <Svg
      width={20 * scale}
      height={20 * scale}
      viewBox="0 0 20 20"
      style={{ position: "absolute", left: x, top: y }}
    >
      {/* Orange twist shape */}
      <Path
        d="M5 10 Q10 2 15 10 Q10 18 5 10 Z"
        fill={color}
        stroke="orange"
        strokeWidth={1}
      />
      <Path
        d="M7 10 Q10 5 13 10 Q10 15 7 10 Z"
        fill="#fff2cc"
        stroke="orange"
        strokeWidth={0.5}
      />
    </Svg>
  );
}
