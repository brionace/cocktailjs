import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function TikiGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "TikiGlassGrad",
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* Thick base to anchor the glass */}
      <rect x={21.75} y={52} width={20.5} height={2} fill="currentColor" />

      {/* Slight top bevel for base */}
      <rect
        x={20}
        y={50}
        width={24}
        height={4}
        rx={2}
        fill="currentColor"
        opacity={0.06}
      />

      {/* Tiki mug body */}
      <rect
        x={22}
        y={10}
        width={20}
        height={42}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        opacity={0.9}
      />
      {/* Body liquid (via Liquid component) */}
      <Liquid
        d={`M21 9 L41 9 L41 51 L21 51 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <rect
        x={21}
        y={9}
        width={20}
        height={42}
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      {/* Tiki face (simple) */}
      <ellipse cx={32} cy={32} rx={6} ry={3} fill="currentColor" />
    </svg>
  );
}
