import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

export default function GarnishTemplate({ size = 24, color = "#ccc" }) {
  const s = size || 24;
  return (
    <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
      <Circle
        cx={s / 2}
        cy={s / 2}
        r={s / 3}
        fill={color}
        stroke="#333"
        strokeWidth={1}
      />
      <Path
        d={`M ${s / 4} ${s / 4} L ${s * 0.75} ${s * 0.75}`}
        stroke="#fff"
        strokeWidth={1}
      />
    </Svg>
  );
}
