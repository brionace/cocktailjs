import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

/**
 * Liquid renderer used by glass components.
 * Props:
 *  - d: path data (string)
 *  - transform: optional transform string
 *  - liquidFill: legacy fill (string or array)
 *  - liquidStyle: style object to pass directly to <Path> (preferred)
 *  - gradientAttr: string, either an external id like "#parentGrad" or JSON/array of colors
 *  - opacity: number
 *  - idBase: unique base id for generated gradients
 */
export default function Liquid({
  d,
  transform,
  liquidFill = null,
  liquidStyle = null,
  gradientAttr = null,
  opacity = 0.7,
  idBase = "liquidGrad",
}) {
  let useExternal = false;
  let stops = null;
  if (typeof gradientAttr === "string") {
    const trimmed = gradientAttr.trim();
    if (trimmed.startsWith("#")) useExternal = true;
    else if (trimmed.startsWith("[")) {
      try {
        stops = JSON.parse(trimmed);
      } catch (e) {
        stops = null;
      }
    } else {
      stops = [trimmed];
    }
  } else if (Array.isArray(gradientAttr)) stops = gradientAttr;

  if (!stops || !stops.length) {
    if (liquidFill) {
      stops = Array.isArray(liquidFill) ? liquidFill : [liquidFill];
    } else {
      stops = ["#93d3d8"];
    }
  }

  const highlight = "#fff7c0";
  const gradStops = [highlight, ...stops];
  const offsets = gradStops.map((_, i) =>
    Math.round((i / Math.max(1, gradStops.length - 1)) * 100)
  );

  const localId = idBase;

  return (
    <>
      {!useExternal && (
        <Defs>
          <LinearGradient id={localId} x1="0" y1="0" x2="0" y2="1">
            {gradStops.map((c, i) => (
              <Stop key={i} offset={`${offsets[i]}%`} stopColor={c} stopOpacity={1} />
            ))}
          </LinearGradient>
        </Defs>
      )}

      <Path
        d={d}
        transform={transform}
        className="liquid"
        style={liquidStyle || undefined}
        fill={
          liquidStyle
            ? undefined
            : useExternal
            ? `url(${gradientAttr})`
            : `url(#${localId})`
        }
        opacity={opacity}
      />
    </>
  );
}
