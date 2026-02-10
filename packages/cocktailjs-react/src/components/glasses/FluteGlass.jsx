import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function FluteGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "FluteGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Correct flute bowl: narrow top → wider middle → narrow base */}

      {/* Liquid filling the bowl (3/4 full) */}
      <Liquid
        d={`
          M30 12        
          L34 12       
          L36 36    
          Q32 38 28 36 
          Z
        `}
        transform="scale(1)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <path
        d="
          M30 12        
          L34 12       
          L36 36    
          Q32 38 28 36 
          Z
        "
        transform="scale(1)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <path
        d="
          M30 12        
          L34 12       
          L36 36    
          Q32 38 28 36 
          Z
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Stem */}
      <rect
        x={32}
        y={37}
        width={strokeWidth}
        height={16}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Base: attach to stem bottom (y=53) and slightly narrower width, centered on stem */}
      <path
        d="M26 53 Q32 52 38 53 L38 53 L26 53 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
