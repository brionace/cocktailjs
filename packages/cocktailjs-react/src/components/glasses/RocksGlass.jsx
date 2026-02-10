import React from "react";

import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function RocksGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
  idBase = "RocksGlassGrad",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Combined liquid (fills interior) */}
      <Liquid
        d={`M14 24 L50 24 L50 58 L14 58 Z`}
        transform="scale(1)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <rect
        x={14}
        y={24}
        width={36}
        height={34}
        transform="scale(1)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}
      {/* Glass outline */}
      <rect
        x={14}
        y={24}
        width={36}
        height={34}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Base (connects cleanly to side bottoms) */}
      <line
        x1={13.7}
        y1={59}
        x2={50.2}
        y2={59}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
