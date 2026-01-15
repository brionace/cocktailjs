import Svg, { Path, Rect, Line } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function WineGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  const height = Math.round((size * 90) / 80);
  return (
    <Svg width={size} height={height} viewBox="0 0 64 90">
      {/* Liquid */}
      <Path
        d="M26 26 L38 26 Q44 62 32 62 Q20 62 26 26 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      {/* Bowl with flat top */}
      <Path
        d="M26 26 L38 26 Q44 62 32 62 Q20 62 26 26 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Stem (connects bowl to base) */}
      <Rect x={31.5} y={62} width={1} height={25} fill="currentColor" />
      {/* Curved base (subtle Absinthe-style curve) */}
      <Path d="M24 86 Q32 84 40 86 L40 87 L24 87 Z" fill="currentColor" />
    </Svg>
  );
}
