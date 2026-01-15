import Svg, { Rect, Line } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function RocksGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Liquid */}
      <Rect
        x={14}
        y={24}
        width={36}
        height={34}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      {/* Glass outline */}
      <Rect
        x={14}
        y={24}
        width={36}
        height={34}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Base (connects cleanly to side bottoms) */}
      <Line
        x1={13.7}
        y1={59}
        x2={50.2}
        y2={59}
        stroke="currentColor"
        strokeWidth="2"
      />
    </Svg>
  );
}
