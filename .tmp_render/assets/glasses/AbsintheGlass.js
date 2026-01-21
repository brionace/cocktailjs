"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AbsintheGlass;
var _react = _interopRequireDefault(require("react"));
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _Liquid = _interopRequireDefault(require("../Liquid"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function AbsintheGlass({
  liquidFill = ["#A8E6CF", "#DCEDC2", "#FFD3B6"],
  size = 80,
  strokeWidth = 0.5
}) {
  const height = Math.floor(size * 1.125); // Maintain 80:90 aspect ratio
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
    width: size,
    height: height,
    viewBox: "0 0 64 90",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Liquid.default, {
      d: `M20 35 L44 35 L42 49 Q32 52 22 49 Z
           M26 50 Q32 50 38 50 L36 60 L28 60 Z`,
      transform: "scale(0.98)",
      idBase: "AbsintheGlassGrad",
      opacity: 0.7,
      liquidFill: liquidFill
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: `M20 35 L44 35 L42 49 Q32 52 22 49 Z
           M26 50 Q32 50 38 50 L36 60 L28 60 Z`,
      stroke: "currentColor",
      strokeWidth: strokeWidth,
      fill: "none"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Rect, {
      x: 31,
      y: 60,
      width: 2,
      height: 16,
      fill: "black",
      stroke: "currentColor",
      strokeWidth: strokeWidth
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: " M24 77 Q32 76 40 77 L40 77 L24 77 Z ",
      fill: "currentColor",
      stroke: "currentColor",
      strokeWidth: strokeWidth,
      rx: strokeWidth
    })]
  });
}