import Svg, { Path, Rect, Line } from "react-native-svg";
import Liquid from "../Liquid";
import themePkg from "../../utils/theme";
const getStrokeColor = themePkg.getStrokeColor || (themePkg.default && themePkg.default.getStrokeColor);

export default function SlingGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Rim line */}
      <Line
        x1={24}
        y1={12}
        x2={40}
        y2={12}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Tall, narrow, slightly fluted bowl that widens toward the rim */}

      {/* Liquid inset for depth (via Liquid component) */}
      <Liquid
        d={`M25 12 L40 12 C41 29 40 46 32 55 C24 46 24 28 24 12 Z`}
        transform="scale(0.98)"
        idBase="SlingGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <Path
        d="M25 12 L40 12 C41 29 40 46 32 55 C24 46 24 28 24 12 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <Path
        d="M25 12 L40 12 C41 29 40 46 32 55 C24 46 24 28 24 12 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Short stem (centered) */}
      <Rect x={31} y={54} width={2} height={2} fill="currentColor" />

      {/* Narrower, centered curved foot (quarter the previous width) */}
      <Path
        d="M29 56 Q32 55 35 56 L35 56 L29 56 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        rx={1}
      />
    </Svg>
  );
}
