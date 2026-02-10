import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function SourGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "SourGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Flat rim */}
      <line
        x1={16}
        y1={18}
        x2={48}
        y2={18}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Outer bowl with rounded sides, flat top, curving into stem */}

      {/* Liquid inside, following bowl curvature */}
      <Liquid
        d={`
          M16 18
          L48 18
          C46 30, 46 38, 32 42
          C18 38, 18 30, 16 18
          Z
        `}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="
          M16 18
          L48 18
          C46 30, 46 38, 32 42
          C18 38, 18 30, 16 18
          Z
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      <path
        d="
          M16 18
          L48 18
          C46 30, 46 38, 32 42
          C18 38, 18 30, 16 18
          Z
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Stem */}
      <rect x={31} y={42} width={2} height={12} fill="currentColor" />

      {/* Flat base with curved top connecting to stem */}
      <path
        d="
          M22 54
          C22 52, 42 52, 42 54
          L42 54
          L22 54
          Z
        "
        fill="currentColor"
      />
    </svg>
  );
}
