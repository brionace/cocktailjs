import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function SlingGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Rim line */}
      <line
        x1={24}
        y1={12}
        x2={40}
        y2={12}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Tall, narrow, slightly fluted bowl that widens toward the rim */}

      {/* Liquid inset for depth (via Liquid component) */}
      <Liquid
        d={`M25 12 L40 12 C41 29 40 46 32 55 C24 46 24 28 24 12 Z`}
        transform="scale(0.98)"
        idBase="SlingGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="M25 12 L40 12 C41 29 40 46 32 55 C24 46 24 28 24 12 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <path
        d="M25 12 L40 12 C41 29 40 46 32 55 C24 46 24 28 24 12 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Short stem (centered) */}
      <rect x={31} y={54} width={2} height={2} fill="currentColor" />

      {/* Narrower, centered curved foot (quarter the previous width) */}
      <path
        d="M29 56 Q32 55 35 56 L35 56 L29 56 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        rx={1}
      />
    </svg>
  );
}
