import React from "react";

import Liquid from "../Liquid";

// Single shot glass ~30-45 mL (short, sturdy, thick base)
export default function SingleShotGlass({
  liquidFill = ["#FFFFFF", "#E0E0E0"],
  size = 64,
  strokeWidth = 0.5,
  idBase = "SingleShotGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax meet"
    >
<g transform="translate(0,6)">

      {/* Outline: same curved/flared style as DoubleShot but shorter */}
      <path
        d={"M23 28 C24.5 36 24.5 40 25 48 L39 48 C39.5 40 39.5 36 41 28 Z"}
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />

      {/* Liquid (curved interior, shorter) */}
      <Liquid
        d={`M23 28 C24.5 36 24.5 40 25 48 L39 48 C39.5 40 39.5 36 41 28 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />

      {/* Thick base to suggest weight */}
      <rect
        x={25}
        y={48}
        width={14}
        height={3}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />
    
</g>
</svg>
  );
}
