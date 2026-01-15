import React from "react";
import Svg, { Path } from "react-native-svg";

export default function MintSprig({ x = 48, y = 8, scale = 1 }) {
  return (
    <Svg
      width={24 * scale}
      height={32 * scale}
      viewBox="0 0 24 32"
      style={{ position: "absolute", left: x, top: y }}
    >
      {/* Stem */}
      <Path d="M12 28 L12 16" stroke="#388e3c" strokeWidth={2} />
      {/* Leaves */}
      <Path
        d="M12 16 Q8 12 12 8 Q16 12 12 16"
        fill="#43a047"
        stroke="#2e7d32"
        strokeWidth={1}
      />
      <Path
        d="M12 18 Q6 20 8 26 Q14 22 12 18"
        fill="#66bb6a"
        stroke="#388e3c"
        strokeWidth={1}
      />
    </Svg>
  );
}
