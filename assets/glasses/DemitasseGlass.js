import Svg, { Path } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function DemitasseGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Flat-sided cup body (trapezoid) */}
      <Path
        d="M20 24 L24 45 L40 45 L44 24 Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="miter"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M20 24 L24 45 L40 45 L44 24 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      {/* Flat handle (simple arc) */}
      <Path
        d="M43 30 Q55 30 41 40"
        stroke="currentColor"
        fill="none"
        strokeWidth={strokeWidth}
      />
      {/* Thick cup base */}
      <Path
        d={"M24 45 Q32 45 40 45 L40 48 L24 48 Z"}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
