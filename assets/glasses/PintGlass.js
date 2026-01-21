import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import Liquid from "../Liquid";
import GarnishPositioner from "./GarnishPositioner";
import { getStrokeColor } from "../../utils/theme";

export default function PintGlass({
  liquidFill = null,
  garnish = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {garnish && <GarnishPositioner glass="PintGlass" name={garnish} />}

      {/* Outer pint outline */}

      {/* Liquid inside (via Liquid component) */}
      <Liquid
        d={`M18 10 L46 10 L42 54 L22 54 Z`}
        transform="scale(0.98)"
        idBase="PintGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <Path
        d="M18 10 L46 10 L42 54 L22 54 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <Path
        d="M18 10 L46 10 L42 54 L22 54 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Small flat base */}
      <Rect
        x={22}
        y={54}
        width={20}
        height={2}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
