"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CoupeGlass;
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _Liquid = _interopRequireDefault(require("../Liquid"));
var _theme = require("../../utils/theme");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function CoupeGlass({
  liquidFill = null,
  size = 80,
  strokeWidth = 1
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeSvg.default, {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Liquid.default, {
      d: `
          M12 32 Q32 36 52 32 L52 18 Q32 18 12 18 Z 
        `,
      transform: "scale(0.98)",
      idBase: "CoupeGlassGrad",
      opacity: 0.7,
      liquidFill: liquidFill
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: " M12 32 Q32 36 52 32 L52 18 Q32 18 12 18 Z  ",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: strokeWidth
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M32 34 L32 60",
      stroke: "currentColor",
      strokeWidth: strokeWidth
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSvg.Path, {
      d: "M24 60 Q32 59 40 60 L40 60 L24 60 Z",
      fill: "currentColor",
      stroke: "currentColor",
      strokeWidth: strokeWidth
    })]
  });
}