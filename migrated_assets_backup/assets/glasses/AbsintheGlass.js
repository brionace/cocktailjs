import React from "react";
import Svg, { Path, Rect, Line } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function AbsintheGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  const height = Math.floor(size * 1.125); // Maintain 80:90 aspect ratio

  return (
    <Svg width={size} height={height} viewBox="0 0 64 90">
      {/* Waist (narrow inward section) */}
      <Path
        d="
          M20 35 L44 35 L42 49 Q32 52 22 49 Z  
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      <Path
        d="
          M20 35 L44 35 L42 49 Q32 52 22 49 Z  
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Lower reservoir (rounded bulb) */}
      <Path
        d="
          M26 50 Q32 50 38 50 L36 60 L28 60 Z   
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      <Path
        d="
          M26 50 Q32 50 38 50 L36 60 L28 60 Z   
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Stem */}
      <Rect
        x={31}
        y={60}
        width={2}
        height={16}
        fill="black"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Base */}
      <path
        d=" M24 77 Q32 76 40 77 L40 77 L24 77 Z "
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        rx={strokeWidth}
      />
    </Svg>
  );
}
