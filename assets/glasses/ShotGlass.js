import React from "react";
import Svg, { Rect } from "react-native-svg";
import { garnishMap } from "../garnishes";
import GarnishPositioner from "./GarnishPositioner";
import { getStrokeColor } from "../../utils/theme";

export default function ShotGlass({
  liquidFill = null,
  garnish = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Outline */}
      {garnish && <GarnishPositioner glass="ShotGlass" name={garnish} />}
      <Rect
        x={22}
        y={30}
        width={20}
        height={24}
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />
      {/* Liquid */}
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
      {/* Thin base (1px) to anchor the glass visually */}
      <Rect x={21.75} y={54} width={20.5} height={2} fill="currentColor" />
    </Svg>
  );
}
