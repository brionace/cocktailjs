import Svg, { Path } from "react-native-svg";
import Liquid from "../Liquid";
import { getStrokeColor } from "../../utils/theme";

export default function CoupeGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 1,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Outer bowl */}

      {/* Liquid (via Liquid component) */}
      <Liquid
        d={`
          M12 32 Q32 36 52 32 L52 18 Q32 18 12 18 Z 
        `}
        transform="scale(0.98)"
        idBase="CoupeGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <Path
        d="
          M12 32 Q32 36 52 32 L52 18 Q32 18 12 18 Z 
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <Path
        d="
          M12 32 Q32 36 52 32 L52 18 Q32 18 12 18 Z 
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Stem */}
      <Path d="M32 34 L32 60" stroke="currentColor" strokeWidth={strokeWidth} />

      {/* Base: slight curved foot where it meets the stem */}
      <Path
        d={"M24 60 Q32 59 40 60 L40 60 L24 60 Z"}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
