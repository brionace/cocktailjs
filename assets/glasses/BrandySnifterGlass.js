import Svg, { Path, Rect, Line } from "react-native-svg";
import Liquid from "../Liquid";

export default function BrandySnifterGlass({
  liquidFill = ["#F6D29A", "#D98F3A"],
  strokeWidth = 1,
}) {
  return (
    <Svg viewBox="0 0 64 64">
      {/* Combined liquid (single element covering top + bottom bowls) */}
      <Liquid
        d={`M22 28 
          L42 28 
          L44 48 
          Q32 52 20 48 
          Z`}
        transform="scale(0.98)"
        idBase="BrandySnifterGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Liquid inside the bowl */}
      {/* <Path
        d="
          M22 28 
          L42 28 
          L44 48 
          Q32 52 20 48 
          Z
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      /> */}

      {/* Flat bowl with curved bottom corners */}
      <Path
        d="
          M22 28 
          L42 28 
          L44 48 
          Q32 52 20 48 
          Z
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Rim (top line) */}
      <Line
        x1={22}
        y1={28}
        x2={42}
        y2={28}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Stem */}
      <Rect
        x={30}
        y={50}
        width={4}
        height={5}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Base: slight curved top where it meets the stem (fits previous base height) */}
      <Path
        d={"M24 55 Q32 54 40 55 L40 55 L24 55 Z"}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
