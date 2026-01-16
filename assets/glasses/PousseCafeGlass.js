import React from "react";
import Svg, { Path, Rect, G } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function PousseCafeGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  const cx = 32;
  const height = Math.floor(size * 1.125);

  return (
    <Svg width={size} height={height} viewBox="0 0 64 90">
      <G>
        {/* Bowl liquid (rendered first so stroke appears on top) */}
        <Path
          d={`
            M ${cx - 11} 12
            L ${cx + 11} 12
            L ${cx + 9} 38
            Q ${cx} 42 ${cx - 9} 38
            Z
          `}
          transform="scale(0.98)"
          className="liquid"
          opacity={0.7}
          fill={liquidFill}
        />

        {/* Bowl outline (stroke-only) */}
        <Path
          d={`
            M ${cx - 11} 12
            L ${cx + 11} 12
            L ${cx + 9} 38
            Q ${cx} 42 ${cx - 9} 38
            Z
          `}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Subtle highlight on the liquid surface */}
        <Path
          d={`
            M ${cx - 8} 18
            L ${cx + 8} 18
            L ${cx + 6} 30
            Q ${cx} 33 ${cx - 6} 30
            Z
          `}
          fill="rgba(255,255,255,0.06)"
        />

        {/* Stem */}
        <Rect
          x={cx - 1}
          y={40}
          width={2}
          height={10}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />

        {/* Base */}
        <Path
          d={`M ${cx - 6} 50 Q ${cx} 48 ${cx + 6} 50 L ${cx + 6} 50 L ${
            cx - 6
          } 50 Z`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
}
