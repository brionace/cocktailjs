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
  // if true, render a single 'mixed' color instead of a clear gradient
  mixed = false,
  // when mixed=true, how much original color shows (0..1). 0 = pure dominant color, 1 = original colors.
  mixedBlend = 0.25,
  // when mixed=true, opacity applied to gradient stops (0..1)
  mixedOpacity = 0.85,
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

  // helper: parse hex like #abc or #aabbcc
  function hexToRgb(h) {
    if (!h) return [0, 0, 0];
    let s = String(h).trim();
    if (s[0] === "#") s = s.slice(1);
    if (s.length === 3)
      s = s
        .split("")
        .map((c) => c + c)
        .join("");
    const n = parseInt(s, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h, s, l];
  }

  function rgbToHex([r, g, b]) {
    return (
      "#" +
      [r, g, b]
        .map((v) => {
          const s = Math.round(Math.max(0, Math.min(255, v))).toString(16);
          return s.length === 1 ? "0" + s : s;
        })
        .join("")
    );
  }

  function blendHex(a, b, t) {
    const ra = hexToRgb(a);
    const rb = hexToRgb(b);
    const r = Math.round(ra[0] * (1 - t) + rb[0] * t);
    const g = Math.round(ra[1] * (1 - t) + rb[1] * t);
    const bl = Math.round(ra[2] * (1 - t) + rb[2] * t);
    return rgbToHex([r, g, bl]);
  }

  // determine a single 'mixed' color when requested
  let mixedColor = null;
  // when mixed=true we'll also synthesize gradient stops that are blended toward the dominant color
  let mixedGradStops = null;
  if (mixed && !useExternal) {
    try {
      // choose the stop with highest saturation (less gray)
      let best = null;
      let bestS = -1;
      for (const c of gradStops) {
        const rgb = hexToRgb(c);
        const [, s] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        if (s > bestS) {
          bestS = s;
          best = c;
        }
      }
      mixedColor = best || gradStops[0];
      // build blended stops so original colors are still hinted but subdued
      mixedGradStops = gradStops.map((orig) =>
        blendHex(mixedColor, orig, Math.max(0, Math.min(1, mixedBlend))),
      );
    } catch (e) {
      mixedColor = gradStops[0];
      mixedGradStops = gradStops.slice();
    }
  }

  return (
    <>
      {!useExternal && (
        <defs>
          <linearGradient id={localId} x1="0" y1="0" x2="0" y2="1">
            {(mixed && mixedGradStops ? mixedGradStops : gradStops).map(
              (c, i) => (
                <stop
                  key={i}
                  offset={`${offsets[i]}%`}
                  stopColor={c}
                  stopOpacity={mixed && mixedGradStops ? mixedOpacity : 1}
                />
              ),
            )}
          </linearGradient>
        </defs>
      )}

      <path
        d={d}
        transform={transform}
        className="liquid"
        style={liquidStyle || undefined}
        fill={
          // explicit style wins
          liquidStyle
            ? undefined
            : // if external gradient requested, use it
              useExternal
              ? `url(${gradientAttr})`
              : // if mixed requested and no external gradient, prefer the blended gradient (so hints remain)
                mixed && mixedColor
                ? `url(#${localId})`
                : `url(#${localId})`
        }
        opacity={opacity}
      />
    </>
  );
}
