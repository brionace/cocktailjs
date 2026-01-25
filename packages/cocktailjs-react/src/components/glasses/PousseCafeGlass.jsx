import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function PousseCafeGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "PousseCafeGlassGrad",
}) {
  const cx = 32;
  const height = Math.floor(size * 1.125);

  return (
    <svg width={size} height={height} viewBox="0 0 64 90">
      <g>
        {/* Bowl liquid (rendered via Liquid component) */}
        <Liquid
          d={`
            M ${cx - 11} 12
            L ${cx + 11} 12
            L ${cx + 9} 38
            Q ${cx} 42 ${cx - 9} 38
            Z
          `}
          transform="scale(0.98)"
          idBase={idBase}
          opacity={0.7}
          liquidFill={liquidFill}
        />
        {/* Original bowl liquid (commented out)
        <path
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
        */}

        {/* Bowl outline (stroke-only) */}
        <path
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
        <path
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
        <rect
          x={cx - 1}
          y={40}
          width={2}
          height={10}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />

        {/* Base */}
        <path
          d={`M ${cx - 6} 50 Q ${cx} 48 ${cx + 6} 50 L ${cx + 6} 50 L ${
            cx - 6
          } 50 Z`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}
