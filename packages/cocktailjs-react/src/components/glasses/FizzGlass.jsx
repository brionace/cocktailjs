import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function FizzGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Rim */}
      <path d="M22 10 L42 10" stroke="currentColor" strokeWidth={strokeWidth} />

      {/* Straight-sided tall bowl */}

      {/* Liquid (fills ~80% of glass) */}
      <Liquid
        d={`
          M22 10 L24 23 L40 23 L42 10 Z 
        `}
        transform="scale(0.98)"
        idBase="FizzGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="
          M22 10 L24 23 L40 23 L42 10 Z 
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <path
        d="
          M22 10 L24 23 L40 23 L42 10 Z 
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Stem (Fizz glasses often have no stem; include a tiny centered one) */}
      <rect
        x={32}
        y={23}
        width={1}
        height={10}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Base: thin curved foot */}
      <path
        d="M26 33 Q32 32 38 33 L38 33 L26 33 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
