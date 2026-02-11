import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function HighballGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "HighballGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax meet"
    >
<g transform="translate(0,-5)">

      {/* Glass outline */}

      {/* Cocktail liquid (via Liquid component) */}
      <Liquid
        d={`M18 10 L46 10 L46 60 L18 60 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <rect
        x={18}
        y={10}
        width={28}
        height={50}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      <rect
        x={18}
        y={10}
        width={28}
        height={50}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Base (thick foot centered under glass) */}
      <rect
        x={18}
        y={60}
        width={28}
        height={2}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    
</g>
</svg>
  );
}
