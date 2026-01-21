import React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import Liquid from "../Liquid";

// Single shot glass ~30-45 mL (short, sturdy, thick base)
export default function SingleShotGlass({
  liquidFill = ["#FFFFFF", "#E0E0E0"],
  size = 64,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Outline: same curved/flared style as DoubleShot but shorter */}
      <Path
        d={"M23 28 C24.5 36 24.5 40 25 48 L39 48 C39.5 40 39.5 36 41 28 Z"}
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />

      {/* Liquid (curved interior, shorter) */}
      <Liquid
        d={`M23 28 C24.5 36 24.5 40 25 48 L39 48 C39.5 40 39.5 36 41 28 Z`}
        transform="scale(0.98)"
        idBase="SingleShotGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />

      {/* Thick base to suggest weight */}
      <Rect x={24.75} y={48} width={14.5} height={6} fill="currentColor" />
    </Svg>
  );
}
