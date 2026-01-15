import Svg, { Rect, Line } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function HighballGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Glass outline */}

      {/* Cocktail liquid (rendered before outline) */}
      <Rect
        x={18}
        y={10}
        width={28}
        height={50}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      <Rect
        x={18}
        y={10}
        width={28}
        height={50}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Base (thick foot centered under glass) */}
      <Rect
        x={18}
        y={60}
        width={28}
        height={2}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
