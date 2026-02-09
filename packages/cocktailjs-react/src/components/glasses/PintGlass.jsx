import React from "react";

import Liquid from "../Liquid";

export default function PintGlass({
  liquidFill = null,
  garnish = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "PintGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Liquid inside (via Liquid component) */}
      <Liquid
        d={`M18 10 L46 10 L42 54 L22 54 Z`}
        transform="scale(1)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="M18 10 L46 10 L42 54 L22 54 Z"
        transform="scale(1)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <path
        d="M18 10 L46 10 L42 54 L22 54 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Small flat base */}
      <rect
        x={22}
        y={54}
        width={20}
        height={2}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
