import React from "react";

export default function CopperMug({
  size = 80,
  strokeWidth = 0.5,
  fill = "#B87333",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Handle: tall and spanning almost full body height */}
      <path
        d="M47 23 C68 23 68 52 46.5 50"
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth + 2}
      />
      {/* Bulging mug body */}
      <path
        d="
          M18 16      
          L46 16      
          C48 24 48 40 46 56  
          L18 56       
          C16 40 16 24 18 16   
          Z
        "
        transform="scale(1)"
        fill={fill}
      />

      <path
        d="
          M18 16      
          L46 16      
          C48 24 48 40 46 56  
          L18 56       
          C16 40 16 24 18 16   
          Z
        "
        fill="none"
        stroke={fill}
        strokeWidth={strokeWidth}
      />

      {/* Top rim */}
      <line
        x1={18}
        y1={16}
        x2={46}
        y2={16}
        stroke={fill}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
