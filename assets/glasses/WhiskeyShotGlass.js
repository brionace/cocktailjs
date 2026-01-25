import React from "react";
import Svg, { Rect } from "react-native-svg";
import Liquid from "../Liquid";

export default function WhiskeyShotGlass({
  liquidFill = ["#FFFFFF", "#E0E0E0"],
  size = 80,
  strokeWidth = 0.5,
  idBase = "ShotGlassGrad",
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Cylindrical, straight-sided whiskey shot glass (shorter body, heavy base) */}
      <Rect
        x={22}
        y={30}
        width={20}
        height={18}
        // rx={1}
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />
      {/* Liquid (fills interior) */}
      <Liquid
        d={`M22 30 L42 30 L42 48 L22 48 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <Rect
        x={22}
        y={30}
        width={20}
        height={24}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      {/* Heavy base to suggest weight */}
      <Rect
        x={22}
        y={48}
        width={20}
        height={3}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
