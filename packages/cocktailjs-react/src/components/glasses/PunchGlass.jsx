import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function PunchGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "PunchGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax slice"
    >
      <g>
        {/* Compact bowl liquid (via Liquid component) */}
        <Liquid
          d={`
            M22 18
            L42 18
            L38 30
            Q32 34 26 30
            L22 18
            Z
          `}
          transform="scale(1)"
          idBase={idBase}
          opacity={0.7}
          liquidFill={liquidFill}
        />
        {/* Original liquid (commented out)
        <path
          d={`
            M22 18
            L42 18
            L38 30
            Q32 34 26 30
            L22 18
            Z
          `}
          transform="scale(1)"
          className="liquid"
          opacity={0.7}
          fill={liquidFill}
        />
        */}
        <path
          d={`
            M22 18
            L42 18
            L38 30
            Q32 34 26 30
            L22 18
            Z
          `}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Subtle decorative facets to suggest cut glass */}
        <path
          d={`M28 20 L28 28 M32 20 L32 30 M36 20 L36 28`}
          stroke="currentColor"
          strokeWidth={0.6}
          strokeLinecap="round"
          opacity={0.06}
        />

        {/* Short centered stem */}
        <rect
          x={31}
          y={32}
          width={2}
          height={6}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />

        {/* Sturdy curved base (slightly wider, shallow curve) */}
        <path
          d="M26 38 Q32 37 38 38 L38 38 L26 38 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  );
}
