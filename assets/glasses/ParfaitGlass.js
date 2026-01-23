import Svg, { Path, Rect, Ellipse } from "react-native-svg";
import Liquid from "../Liquid";
import themePkg from "../../utils/theme";
const getStrokeColor = themePkg.getStrokeColor || (themePkg.default && themePkg.default.getStrokeColor);

export default function ParfaitGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Tall tapered bowl liquid (via Liquid component) */}
      <Liquid
        d={`
          M22 12
          L42 12
          Q40 30 38 44
          Q32 50 26 44
          Q24 30 22 12
          Z
        `}
        transform="scale(0.98)"
        idBase="ParfaitGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <Path
        d="
          M22 12
          L42 12
          Q40 30 38 44
          Q32 50 26 44
          Q24 30 22 12
          Z
        "
        className="liquid"
        opacity={0.7}
        transform="scale(0.98)"
        fill={liquidFill}
      />
      */}

      {/* Tall tapered bowl outline (stroke-only) */}
      <Path
        d="
          M22 12
          L42 12
          Q40 30 38 44
          Q32 50 26 44
          Q24 30 22 12
          Z
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Stem */}
      <Rect x={31} y={47} width={2} height={8} fill="currentColor" />

      {/* Base: curved top, flat bottom */}
      <Path
        d="
          M22 57 Q32 53 42 57 L42 57.5 L22 57.5 Z 
        "
        fill="currentColor"
      />
    </Svg>
  );
}
