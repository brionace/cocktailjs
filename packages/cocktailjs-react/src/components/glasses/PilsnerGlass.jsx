import React from "react";

import Liquid from "../Liquid";

export default function PilsnerGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "PilsnerGlassGrad",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Liquid (via Liquid component) */}
      <Liquid
        d={`M24 10 L40 10 Q38 36 36 50 Q32 54 28 50 Q26 36 24 10 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="M24 10 L40 10 Q38 36 36 50 Q32 54 28 50 Q26 36 24 10 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      {/* Thick curved base inset between liquid and bottom stroke */}
      <path
        d="M28 50 Q32 55 37 51 L37 56 Q35 56 28.5 56 Z"
        transform="scale(0.98)"
        fill="currentColor"
        className="base"
      />

      {/* Outline: curved top, flat bottom (drawn last) */}
      <path
        d="M24 10 L40 10 Q38 36 36 55 Q32 55 28 55 Q26 36 24 10 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
}
