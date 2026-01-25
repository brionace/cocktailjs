import Svg, { Rect, Line } from "react-native-svg";
import Liquid from "../Liquid";
import themePkg from "../../utils/theme";
const getStrokeColor =
  themePkg.getStrokeColor ||
  (themePkg.default && themePkg.default.getStrokeColor);

export default function RocksGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  idBase = "RocksGlassGrad",
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Combined liquid (fills interior) */}
      <Liquid
        d={`M14 24 L50 24 L50 58 L14 58 Z`}
        transform="scale(0.98)"
        idBase={idBase}
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
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
      */}
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
