import React from "react";

import Liquid from "../Liquid";

export default function AbsintheGlass({
  liquidFill = ["#A8E6CF", "#DCEDC2", "#FFD3B6"],
  size = 80,
  strokeWidth = 0.5,
  idBase = "AbsintheGlassGrad",
}) {
  const height = Math.floor(size * 1.125); // Maintain 80:90 aspect ratio
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 64 90"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Combined liquid (single element covering top + bottom bowls) */}
      <Liquid
        d={`M20 35 L44 35 L42 49 Q32 52 22 49 Z
           M26 50 Q32 50 38 50 L36 60 L28 60 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Combined liquid (single element covering waist + lower reservoir) */}
      {/* <path
        d={`M20 35 L44 35 L42 49 Q32 52 22 49 Z
           M26 50 Q32 50 38 50 L36 60 L28 60 Z`}
        transform="scale(1)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      /> */}
      {/* Combined stroke for the liquid outlines */}
      <path
        d={`M20 35 L44 35 L42 49 Q32 52 22 49 Z
           M26 50 Q32 50 38 50 L36 60 L28 60 Z`}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Stem */}
      <rect
        x={31}
        y={60}
        width={2}
        height={16}
        fill="black"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Base */}
      <path
        d=" M24 77 Q32 76 40 77 L40 77 L24 77 Z "
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        rx={strokeWidth}
      />
    </svg>
  );
}
