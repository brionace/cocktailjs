import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function SnifterGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "SnifterGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Flat rim line */}
      <line
        x1={22}
        y1={18}
        x2={42}
        y2={18}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Outer bowl with flat top */}
      <path
        d="
          M22 18
          C16 32, 16 46, 32 52
          C48 46, 48 32, 42 18
          Z
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Liquid filling the bowl (via Liquid component) */}
      <Liquid
        d={` M22 18 C16 32, 16 46, 32 52 C48 46, 48 32, 42 18 Z `}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d=" M22 18 C16 32, 16 46, 32 52 C48 46, 48 32, 42 18 Z "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      {/* Short stem (use theme stroke color) */}
      <rect
        x={30}
        y={51}
        width={4}
        height={4}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Wider, more visible curved base attached to stem bottom */}
      <path
        d="M26 54 Q32 51 38 54 L38 55 L26 55 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
