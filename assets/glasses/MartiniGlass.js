import React from "react";
import Svg, { Path } from "react-native-svg";
import { Garnishes } from "./Garnishes";
import GarnishPositioner from "./GarnishPositioner";
import { getStrokeColor } from "../../utils/theme";

export default function MartiniGlass({
  liquidFill = null,
  garnish = null,
  size = 80,
  strokeWidth = 1,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Garnish (positioned) */}
      {garnish && <GarnishPositioner glass="MartiniGlass" name={garnish} />}

      {/* Cocktail liquid */}
      <Path
        d="M10 10 L54 10 L32 40 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />

      {/* Glass outline */}
      <Path
        d="M10 10 L54 10 L32 40 Z"
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />

      {/* Stem */}
      <Path d="M32 40 L32 58" stroke="currentColor" strokeWidth={strokeWidth} />
      {/* Curved base (Absinthe-style) attached to stem bottom */}
      <Path d=" M24 58 Q32 57 40 58 L40 59 L24 59 Z " fill="currentColor" />
    </Svg>
  );
}
