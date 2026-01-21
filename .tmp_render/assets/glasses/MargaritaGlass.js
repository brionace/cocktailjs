"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MargaritaGlass;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _Liquid = _interopRequireDefault(require("../Liquid"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function MargaritaGlass({
  liquidFill = ["#A8E063", "#56AB2F"],
  // liquidStyle = "gradient",
  // gradientAttr = { x1: "0", y1: "0", x2: "0", y2: "1" },
  size = 80,
  strokeWidth = 0.5
}) {
  const stops = liquidFill;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Liquid.default, {
      d: `M14 18 L50 18 Q46 28 36 29 Q30 30 28 29 Q18 28 14 18 Z M28 29 Q32 29 36 29 Q38 34 32 36 Q26 34 28 29 Z`,
      transform: "scale(0.98)",
      idBase: "MargaritaGlassGrad",
      opacity: 0.7,
      liquidFill: liquidFill
      // liquidStyle={liquidStyle}
      // gradientAttr={gradientAttr}
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: `M14 18 L50 18 Q46 28 36 29 Q30 30 28 29 Q18 28 14 18 Z
           M28 29 Q32 29 36 29 Q38 34 32 36 Q26 34 28 29 Z`,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: strokeWidth
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
      x: 31.5,
      y: 36,
      width: 1,
      height: 10,
      fill: "currentColor",
      stroke: "currentColor",
      strokeWidth: strokeWidth
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: " M24 46 Q32 45 40 46 L40 47 L24 47 Z ",
      fill: "currentColor",
      strokeWidth: 0
    })]
  });
}