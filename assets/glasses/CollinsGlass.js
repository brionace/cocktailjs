import Svg, { Rect, Line } from "react-native-svg";
import Liquid from "../Liquid";

export default function CollinsGlass({
  liquidFill = ["#FFF7C0", "#FFD27A"],
  strokeWidth = 0.5,
}) {
  return (
    <Svg viewBox="0 0 64 64">
      <Liquid
        d={`M22 10 L42 10 L42 54 L22 54 Z`}
        transform="scale(0.98)"
        idBase="CollinsGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />

      {/* Liquid (lower than rim, perfectly aligned inside) */}
      {/* <Rect
        x={23}
        y={11}
        width={18}
        height={42}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      /> */}

      {/* Glass sides */}
      <Line
        x1={22}
        y1={10}
        x2={22}
        y2={54}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      <Line
        x1={42}
        y1={10}
        x2={42}
        y2={54}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Rim (connects cleanly to side tops) */}
      <Line
        x1={21.76}
        y1={10}
        x2={42.24}
        y2={10}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Base (thicker filled foot, connects to side bottoms) */}
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
