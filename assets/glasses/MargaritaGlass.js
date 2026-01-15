import Svg, { Path, Rect, Ellipse } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function MargaritaGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Top bowl with flat rim, smoothly curving to bottom bowl */}
      <Path
        d="M14 18 L50 18 Q46 28 36 29 Q30 30 28 29 Q18 28 14 18 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      <Path
        d="M14 18 L50 18 Q46 28 36 29 Q30 30 28 29 Q18 28 14 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Bottom bowl, connected to top bowl */}
      <Path
        d="M28 29 Q32 29 36 29 Q38 34 32 36 Q26 34 28 29 Z"
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      <Path
        d="M28 29 Q32 29 36 29 Q38 34 32 36 Q26 34 28 29 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Stem */}
      <Rect
        x={31.5}
        y={36}
        width={1}
        height={10}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      {/* Curved base (Absinthe-style), attached to stem bottom */}
      <Path
        d=" M24 46 Q32 45 40 46 L40 47 L24 47 Z "
        fill="currentColor"
        strokeWidth={0}
      />
    </Svg>
  );
}
