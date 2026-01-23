import Svg, { Rect, Path, G } from "react-native-svg";
import Liquid from "../Liquid";
import themePkg from "../../utils/theme";
const getStrokeColor = themePkg.getStrokeColor || (themePkg.default && themePkg.default.getStrokeColor);

export default function TankardGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 1,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Heavy base (wide, weighty for stability) */}
      <Rect x={13} y={44} width={36} height={4} fill="currentColor" />

      {/* Outer body (thick glass) */}

      {/* Inner wall liquid (via Liquid component) */}
      <Liquid
        d={`M14 10 L48 10 L48 44 L14 44 Z`}
        transform="scale(0.98)"
        idBase="TankardGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original inner wall liquid (commented out)
      <Rect
        x={14}
        y={10}
        width={34}
        height={34}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <Rect
        x={14}
        y={10}
        width={34}
        height={34}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.4}
      />

      {/* Large ergonomic handle (two-stroke technique: outer stroke + inner cut to suggest hollow) */}
      <G>
        <Path
          d="M49 17 C60 19 60 34 49 37"
          stroke="currentColor"
          strokeWidth={strokeWidth * 3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </G>
    </Svg>
  );
}
