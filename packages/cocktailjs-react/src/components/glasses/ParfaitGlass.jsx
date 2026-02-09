import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function ParfaitGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "ParfaitGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Tall tapered bowl liquid (via Liquid component) */}
      <Liquid
        d={`
          M22 12
          L42 12
          Q40 30 38 44
          Q32 50 26 44
          Q24 30 22 12
          Z
        `}
        transform="scale(1)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="
          M22 12
          L42 12
          Q40 30 38 44
          Q32 50 26 44
          Q24 30 22 12
          Z
        "
        className="liquid"
        opacity={0.7}
        transform="scale(1)"
        fill={liquidFill}
      />
      */}

      {/* Tall tapered bowl outline (stroke-only) */}
      <path
        d="
          M22 12
          L42 12
          Q40 30 38 44
          Q32 50 26 44
          Q24 30 22 12
          Z
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Stem */}
      <rect x={31} y={47} width={2} height={8} fill="currentColor" />

      {/* Base: curved top, flat bottom */}
      <path
        d="
          M22 57 Q32 53 42 57 L42 57.5 L22 57.5 Z 
        "
        fill="currentColor"
      />
    </svg>
  );
}
