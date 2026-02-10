import React from "react";

import Liquid from "../Liquid";

export default function HurricaneGlass({
  liquidFill = null,
  garnish = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "HurricaneGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Liquid inside (via Liquid component) */}
      <Liquid
        d={`M24 10 C16 22, 24 38, 28 44 C30 48, 34 48, 36 44 C40 38, 48 22, 40 10 Z`}
        transform="scale(1)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="M24 10 C16 22, 24 38, 28 44 C30 48, 34 48, 36 44 C40 38, 48 22, 40 10 Z"
        transform="scale(1)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      <path
        d="M24 10 C16 22, 24 38, 28 44 C30 48, 34 48, 36 44 C40 38, 48 22, 40 10 Z"
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />
      {/* Stem / base */}
      {/* Short stocky stem centered on x=32; bottom stays at y=62 to connect to base */}
      <rect
        x={30.5}
        y={47}
        width={3}
        height={10}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Curved, thicker foot centered under stem (attached to stem bottom at y=57) */}
      <path
        d="M26 57 Q32 56 38 57 L38 57 L26 57 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
