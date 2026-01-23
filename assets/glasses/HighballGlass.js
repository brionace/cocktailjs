import Svg, { Rect, Line } from "react-native-svg";
import Liquid from "../Liquid";
import themePkg from "../../utils/theme";
const getStrokeColor =
  themePkg.getStrokeColor ||
  (themePkg.default && themePkg.default.getStrokeColor);

export default function HighballGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Glass outline */}

      {/* Cocktail liquid (via Liquid component) */}
      <Liquid
        d={`M18 10 L46 10 L46 60 L18 60 Z`}
        transform="scale(0.98)"
        idBase="HighballGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
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
      */}
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
