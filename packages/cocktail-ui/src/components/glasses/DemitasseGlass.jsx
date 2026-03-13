import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function DemitasseGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "DemitasseGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax meet"
    >
<g transform="translate(0,9)">

      {/* Flat-sided cup body (trapezoid) */}
      <path
        d="M20 24 L24 45 L40 45 L44 24 Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="miter"
        strokeWidth={strokeWidth}
      />
      {/* Cup liquid (via Liquid component) */}
      <Liquid
        d={`M20 24 L24 45 L40 45 L44 24 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="M20 24 L24 45 L40 45 L44 24 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      {/* Flat handle (simple arc) */}
      <path
        d="M43 30 Q55 30 41 40"
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />
      {/* Thick cup base */}
      <path
        d={"M24 45 Q32 45 40 45 L40 48 L24 48 Z"}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    
</g>
</svg>
  );
}
