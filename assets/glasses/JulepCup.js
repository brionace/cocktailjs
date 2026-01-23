import Svg, { Path, Rect } from "react-native-svg";

export default function JulepCup({
  fill = "#a1a1a1",
  size = 80,
  strokeWidth = 0.5,
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      {/* Rim (wider than body) */}
      <Rect
        x={17}
        y={21}
        width={30}
        height={1}
        rx={1}
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth}
      />
      <Rect
        x={17}
        y={21}
        width={30}
        height={1}
        rx={1}
        transform="scale(0.98)"
        opacity={0.7}
        fill={fill}
        strokeWidth={0}
      />

      {/* Tapered cylindrical body */}
      <Path
        d="
          M18 22
          L46 22
          L42 54
          L22 54
          Z
        "
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth}
      />
      <Path
        d="
          M18 22
          L46 22
          L42 54
          L22 54
          Z
        "
        transform="scale(0.98)"
        fill={fill}
      />

      {/* Base ring (metal foot) */}
      <Rect
        x={20}
        y={53}
        width={24}
        height={1}
        rx={strokeWidth}
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth}
      />
      <Rect
        x={20}
        y={53}
        width={24}
        height={1}
        rx={strokeWidth}
        transform="scale(0.98)"
        fill={fill}
        strokeWidth={0}
      />

      {/* Lower decorative ring */}
      <Rect
        x={18.8}
        y={54}
        width={26}
        height={1}
        rx={strokeWidth}
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth}
      />
      <Rect
        x={18.8}
        y={54}
        width={26}
        height={1}
        rx={strokeWidth}
        transform="scale(0.98)"
        fill={fill}
        strokeWidth={0}
      />
    </Svg>
  );
}
