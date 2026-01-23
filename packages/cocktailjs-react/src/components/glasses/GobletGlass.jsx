import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function GobletGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 2,
}) {
  const height = Math.round((size * 90) / 80);

  return (
    <svg width={size} height={height} viewBox="0 0 64 90">
      {/* Stem: short and stocky, centered on x=32 (lowered to avoid bowl overlap) */}
      <rect
        x={30.5}
        y={69}
        width={3}
        height={8}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Deep rounded goblet bowl (via Liquid component) */}
      <Liquid
        d={` M19 28 L46 28 Q52 58 32 70 Q12 58 16 28 Z `}
        transform="scale(0.98)"
        idBase="GobletGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d=" M19 28 L46 28 Q52 58 32 70 Q12 58 16 28 Z "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      <path
        d="
          M16 28           
          L48 28          
          Q52 58 32 70     
          Q12 58 16 28     
          Z
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Rim line */}
      <line
        x1={16}
        y1={28}
        x2={48}
        y2={28}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Foot / base: lowered to attach to stem bottom (y=78) */}
      <path
        d=" M24 77 Q32 76 40 77 L40 77 L24 77 Z " // attach to stem bottom (y=78)
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
