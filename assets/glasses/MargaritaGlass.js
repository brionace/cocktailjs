import Svg, { Path, Rect } from "react-native-svg";
import Liquid from "../Liquid";

export default function MargaritaGlass({
  liquidFill = ["#A8E063", "#56AB2F"],
  // liquidStyle = "gradient",
  // gradientAttr = { x1: "0", y1: "0", x2: "0", y2: "1" },
  size = 80,
  strokeWidth = 0.5,
}) {
  const stops = liquidFill;
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Combined liquid (single element covering top + bottom bowls) */}
      <Liquid
        d={`M14 18 L50 18 Q46 28 36 29 Q30 30 28 29 Q18 28 14 18 Z M28 29 Q32 29 36 29 Q38 34 32 36 Q26 34 28 29 Z`}
        transform="scale(0.98)"
        idBase="MargaritaGlassGrad"
        opacity={0.7}
        liquidFill={liquidFill}
        // liquidStyle={liquidStyle}
        // gradientAttr={gradientAttr}
      />
      {/* <Path
        d={`M14 18 L50 18 Q46 28 36 29 Q30 30 28 29 Q18 28 14 18 Z
           M28 29 Q32 29 36 29 Q38 34 32 36 Q26 34 28 29 Z`}
        transform="scale(0.98)"
        className="liquid"
        opacity={0.7}
        fill="url(#margaritaGrad)"
      /> */}
      {/* Combined stroke for both bowl outlines */}
      <Path
        d={`M14 18 L50 18 Q46 28 36 29 Q30 30 28 29 Q18 28 14 18 Z
           M28 29 Q32 29 36 29 Q38 34 32 36 Q26 34 28 29 Z`}
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
