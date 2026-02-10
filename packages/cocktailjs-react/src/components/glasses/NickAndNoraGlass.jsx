import React from "react";

import Liquid from "../Liquid";

export default function NickAndNoraGlass({
  liquidFill = null,
  garnish = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "NickAndNoraGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Bowl liquid (via Liquid component) */}
      <Liquid
        d={`M24 38 L24 24 L40 24 L40 38 Q32 40 24 38 Z`}
          transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="M24 38 L24 24 L40 24 L40 38 Q32 40 24 38 Z"
          transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      <path
        d="M24 38 L24 24 L40 24 L40 38 Q32 40 24 38 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Elongated stem */}
      <rect
        x={32}
        y={39}
        width={1}
        height={16}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Curved base (Absinthe-style) attached to stem bottom */}
      <path
        d=" M24 55 Q32 54 40 55 L40 55 L24 55 Z "
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
