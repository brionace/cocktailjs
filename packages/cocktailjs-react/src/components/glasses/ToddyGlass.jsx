import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function ToddyGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.8,
  idBase = "ToddyGlassGrad",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Double-walled outer shell (visualized by outer stroke) */}

      {/* Liquid (via Liquid component) */}
      <Liquid
        d={`M22 12 H42 V40 H22 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="M22 12 H42 V40 H22 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <path
        d="M22 12 H42 V40 H22 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      {/* Large ergonomic handle (outer stroke + inner cut) */}
      <g>
        <path
          d="M43 16 C52 18 52 34 43 36"
          stroke="currentColor"
          strokeWidth={strokeWidth * 2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Short stem */}
      <rect x={30} y={40} width={4} height={6} fill="currentColor" />

      {/* Footed curved base (subtle Absinthe-style curve) */}
      <path d="M22 47 Q32 43 42 47 L42 48 L22 48 Z" fill="currentColor" />
    </svg>
  );
}
