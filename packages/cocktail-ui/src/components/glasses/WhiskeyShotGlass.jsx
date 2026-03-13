import React from "react";

import Liquid from "../Liquid";

export default function WhiskeyShotGlass({
  liquidFill = ["#FFFFFF", "#E0E0E0"],
  size = 80,
  strokeWidth = 0.5,
  idBase = "ShotGlassGrad",
  // any extra props will be forwarded to `Liquid`
  ...liquidProps
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax meet"
    >
<g transform="translate(0,0)">

      {/* Cylindrical, straight-sided whiskey shot glass (shorter body, heavy base) */}
      <rect
        x={18}
        y={30}
        width={30}
        height={24}
        // rx={1}
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />
      {/* Liquid (fills interior) */}
      <Liquid
        d={`M18 30 L48 30 L48 54 L18 54 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
        {...liquidProps}
      />
      {/* Original liquid (commented out)
      <rect
        x={22}
        y={30}
        width={30}
        height={18}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      {/* Heavy base to suggest weight */}
      <rect
        x={18}
        y={54}
        width={30}
        height={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    
</g>
</svg>
  );
}
