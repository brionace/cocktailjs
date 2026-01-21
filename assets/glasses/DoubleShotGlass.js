import React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import Liquid from "../Liquid";

// Double shot glass ~60-90 mL (taller, retains sturdy base)
export default function DoubleShotGlass({
  liquidFill = ["#FFF7C0", "#FFD27A"],
  size = 64,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Outline (curved, flaring toward the top) */}
      <Path
        d={"M20 18 C22 30 22 46 22.5 58 L41.5 58 C42.5 46 42.5 30 44 18 Z"}
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />

      {/* Liquid (curved/flared interior) */}
      <Liquid
        d={`M20 18 C22 30 22 46 22.5 58 L41.5 58 C42.5 46 42.5 30 44 18 Z`}
        transform="scale(0.98)"
        idBase="DoubleShotGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />

      {/* Thick base */}
      <Rect x={22.25} y={58} width={19.5} height={6} fill="currentColor" />
    </Svg>
  );
}
