import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function CordialGlass({
  liquidFill = null,
  strokeWidth = 0.5,
  idBase = "CordialGlassGrad",
}) {
  return (
    <svg viewBox="0 0 64 64" preserveAspectRatio="xMidYMax slice">
      {/* Bowl / cup liquid (via Liquid component) */}
      <Liquid
        d={`M30 16 L35 16 Q34 25 31 26 Q30 26 28 16 Z`}
        transform="scale(1)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original bowl liquid (commented out)
      <path
        d="M30 16 L35 16 Q34 25 31 26 Q30 26 28 16 Z"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      <path
        d="M28 16 L36 16 Q34 26 32 26 Q30 26 28 16 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Thin stem */}
      <rect
        x={31.8}
        y={26}
        width={0.5}
        height={6}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Liquid inside (subtle surface) */}
      <path
        d="M28.5 17 L35.5 17 Q34 25 32 25 Q30 25 28.5 17 Z"
        fill="rgba(255,255,255,0.06)"
      />

      {/* Base: slightly wider, centered under the stem */}
      <path
        d={"M28 32 Q32 31 36 32 L36 32 L28 32 Z"}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
