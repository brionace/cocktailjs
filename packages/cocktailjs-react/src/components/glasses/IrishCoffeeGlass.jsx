import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function IrishCoffeeGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 2,
  idBase = "IrishCoffeeGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Rounded handle with proper loop */}
      <path
        d=" M42 18 Q60 20 44 30 "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Tall cylindrical bowl liquid (via Liquid component) */}
      <Liquid
        d={`
            M22 16
            L42 16
            L44 30
            Q44 38 32 42
            Q20 38 20 30
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
            M22 16
            L42 16
            L44 30
            Q44 38 32 42
            Q20 38 20 30
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
            M22 16
            L42 16
            L44 30
            Q44 38 32 42
            Q20 38 20 30
            Z
          "
        stroke="currentColor"
        strokeWidth={strokeWidth - 1}
        fill="none"
      />

      {/* Minimal stem: almost no stem, centered on x=32 */}
      <rect
        x={31}
        y={42}
        width={2}
        height={2}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Curved pedestal base (Absinthe-style) attached to stem bottom */}
      <path
        d=" M24 44 Q32 43 40 44 L40 44 L24 44 Z "
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
