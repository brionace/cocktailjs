import React from "react";


/**
 * Liquid renderer used by glass components.
 * Props:
 *  - d: path data (string)
 *  - transform: optional transform string
 *  - liquidFill: legacy fill (string or array)
 *  - liquidStyle: style object to pass directly to <path> (preferred)
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
  // highlight mode: 'liquid' | 'ice' | 'all' | falsy
  highlight = null,
  // highlight color for the top stop when highlight targets the liquid
  highlightColor = "#fff7c0",
  // level: 0..1 vertical span of the gradient (1 = full height)
  level = 1,
  // optional explicit stop positions (array of 0..1) matching gradStops length
  stopPositions = null,
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

  const shouldHighlightLiquid = highlight === "liquid" || highlight === "all";
  const gradStops = shouldHighlightLiquid
    ? [highlightColor, ...stops]
    : [...stops];

  let offsets;
  if (
    Array.isArray(stopPositions) &&
    stopPositions.length === gradStops.length
  ) {
    offsets = stopPositions.map((s) => {
      const n = Number(s) || 0;
      return Math.round(Math.max(0, Math.min(1, n)) * 100);
    });
  } else {
    const levelVal = Math.max(0, Math.min(1, Number(level) || 0));
    const base = 1 - levelVal;
    if (gradStops.length === 1) offsets = [100];
    else
      offsets = gradStops.map((_, i) => {
        const frac = i / Math.max(1, gradStops.length - 1);
        return Math.round((base + frac * levelVal) * 100);
      });
  }

  const localId = idBase;

  return (
    <>
      {!useExternal && (
        <defs>
          <linearGradient id={localId} x1="0" y1="0" x2="0" y2="1">
            {gradStops.map((c, i) => (
              <stop
                key={i}
                offset={`${offsets[i]}%`}
                stopColor={c}
                stopOpacity={1}
              />
            ))}
          </linearGradient>
        </defs>
      )}

      <path
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
