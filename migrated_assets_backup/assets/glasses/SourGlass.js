import Svg, { Path, Rect, Line } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function SourGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Flat rim */}
      <Line
        x1={16}
        y1={18}
        x2={48}
        y2={18}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Outer bowl with rounded sides, flat top, curving into stem */}

      {/* Liquid inside, following bowl curvature (rendered before outline) */}
      <Path
        d="
          M16 18
          L48 18
          C46 30, 46 38, 32 42
          C18 38, 18 30, 16 18
          Z
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      <Path
        d="
          M16 18
          L48 18
          C46 30, 46 38, 32 42
          C18 38, 18 30, 16 18
          Z
        "
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Stem */}
      <Rect x={31} y={42} width={2} height={12} fill="currentColor" />

      {/* Flat base with curved top connecting to stem */}
      <Path
        d="
          M22 54
          C22 52, 42 52, 42 54
          L42 54
          L22 54
          Z
        "
        fill="currentColor"
      />
    </Svg>
  );
}
