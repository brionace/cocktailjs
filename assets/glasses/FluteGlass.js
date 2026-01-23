import Svg, { Path, Rect } from "react-native-svg";
import Liquid from "../Liquid";
import themePkg from "../../utils/theme";
const getStrokeColor = themePkg.getStrokeColor || (themePkg.default && themePkg.default.getStrokeColor);

export default function FluteGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Correct flute bowl: narrow top → wider middle → narrow base */}

      {/* Liquid filling the bowl (3/4 full) */}
      <Liquid
        d={`
          M30 12        
          L34 12       
          L36 36    
          Q32 38 28 36 
          Z
        `}
        transform="scale(0.98)"
        idBase="FluteGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
      />
      {/* Original liquid (commented out)
      <Path
        d="
          M30 12        
          L34 12       
          L36 36    
          Q32 38 28 36 
          Z
        "
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill={liquidFill}
      />
      */}

      <Path
        d="
          M30 12        
          L34 12       
          L36 36    
          Q32 38 28 36 
          Z
        "
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Stem */}
      <Rect
        x={32}
        y={37}
        width={strokeWidth}
        height={16}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Base: attach to stem bottom (y=53) and slightly narrower width, centered on stem */}
      <Path
        d="M26 53 Q32 52 38 53 L38 53 L26 53 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
