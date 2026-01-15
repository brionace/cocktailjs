import Svg, { Rect, Path, Line } from "react-native-svg";
import { getStrokeColor } from "../../utils/theme";

export default function CopperMug({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Handle: tall and spanning almost full body height */}
      <Path
        d="M47 23 C68 23 68 52 46.5 50"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth + 2}
      />
      {/* Bulging mug body */}
      <Path
        d="
          M18 16      
          L46 16      
          C48 24 48 40 46 56  
          L18 56       
          C16 40 16 24 18 16   
          Z
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill="currentColor"
      />

      <Path
        d="
          M18 16      
          L46 16      
          C48 24 48 40 46 56  
          L18 56       
          C16 40 16 24 18 16   
          Z
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Top rim */}
      <Line
        x1={18}
        y1={16}
        x2={46}
        y2={16}
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
