import React from "react";
import Svg, { Circle, Line } from "react-native-svg";

export default function LemonSlice({ x = 48, y = 8, scale = 1 }) {
  return (
    <Svg
      width={20 * scale}
      height={20 * scale}
      viewBox="0 0 20 20"
      style={{ position: "absolute", left: x, top: y }}
    >
      <Circle
        cx={10}
        cy={10}
        r={9}
        fill="yellow"
        stroke="orange"
        strokeWidth={1}
      />
      {/* Segments */}
      <Line x1="10" y1="1" x2="10" y2="19" stroke="orange" strokeWidth={1} />
      <Line x1="1" y1="10" x2="19" y2="10" stroke="orange" strokeWidth={1} />
      <Line x1="3" y1="3" x2="17" y2="17" stroke="orange" strokeWidth={1} />
      <Line x1="17" y1="3" x2="3" y2="17" stroke="orange" strokeWidth={1} />
    </Svg>
  );
}
