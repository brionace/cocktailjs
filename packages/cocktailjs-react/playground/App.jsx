import React, { useState } from "react";
import * as Glasses from "@cocktailsrc";

export default function App() {
  const [size, setSize] = useState(200);
  const [strokeWidth, setStrokeWidth] = useState(0.5);
  // default to distinct colors so gradients are visible in the playground
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#64748b");
  const [color3, setColor3] = useState("#f59e0b");
  const [highlight, setHighlight] = useState(null);
  const [highlightColor, setHighlightColor] = useState("#fff7c0");
  const [level, setLevel] = useState(1);
  const [stopPositions, setStopPositions] = useState("");
  const [mixed, setMixed] = useState(false);
  const [mixedBlend, setMixedBlend] = useState(0.25);
  const [mixedOpacity, setMixedOpacity] = useState(0.85);
  const [idBase, setIdBase] = useState("demoGrad");
  const [fillOpacity, setFillOpacity] = useState(0.85);
  const [gradientAttr, setGradientAttr] = useState("");
  const [liquidStyleText, setLiquidStyleText] = useState("");
  const [selectedGlass, setSelectedGlass] = useState("WhiskeyShotGlass");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 20 }}>
      <h2>cocktailjs-react Playground</h2>
      <div style={{ display: "flex", gap: 24 }}>
        <div>
          <label>Size: {size}</label>
          <input
            type="range"
            min="64"
            max="600"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <div>
            <label>Component:</label>
            <select
              value={selectedGlass}
              onChange={(e) => setSelectedGlass(e.target.value)}
            >
              {Object.keys(Glasses)
                .filter((k) => k.endsWith("Glass"))
                .map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>Stroke:</label>
            <input
              type="number"
              step="0.1"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Liquid colors:</label>
            <div>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
              />
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
              />
              <input
                type="color"
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>idBase:</label>
            <input
              type="text"
              value={idBase}
              onChange={(e) => setIdBase(e.target.value)}
            />
          </div>
          <div>
            <label>Fill opacity: {fillOpacity}</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={fillOpacity}
              onChange={(e) => setFillOpacity(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Gradient attr (optional):</label>
            <input
              type="text"
              value={gradientAttr}
              onChange={(e) => setGradientAttr(e.target.value)}
              placeholder={'#id or ["#a","#b"]'}
            />
          </div>
          <div>
            <label>Liquid style (JSON):</label>
            <textarea
              rows={3}
              style={{ width: 240 }}
              value={liquidStyleText}
              onChange={(e) => setLiquidStyleText(e.target.value)}
              placeholder={'{"filter":"url(#blur)"}'}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <label>Highlight:</label>
            <select
              value={highlight || ""}
              onChange={(e) => setHighlight(e.target.value || null)}
            >
              <option value="">none</option>
              <option value="liquid">liquid</option>
              <option value="ice">ice</option>
              <option value="all">all</option>
            </select>
          </div>
          <div style={{ marginTop: 12 }}>
            <label>
              <input
                type="checkbox"
                checked={mixed}
                onChange={(e) => setMixed(e.target.checked)}
              />{" "}
              Mixed (subdued gradient)
            </label>
          </div>
          {mixed && (
            <div>
              <label>Mixed blend: {mixedBlend}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={mixedBlend}
                onChange={(e) => setMixedBlend(Number(e.target.value))}
              />
              <label>Mixed opacity: {mixedOpacity}</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={mixedOpacity}
                onChange={(e) => setMixedOpacity(Number(e.target.value))}
              />
            </div>
          )}
          {/* mix/shake controls removed for now */}
          <div>
            <label>Highlight color:</label>
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
            />
          </div>
          <div>
            <label>Level: {level}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Stop positions (comma 0..1):</label>
            <input
              type="text"
              value={stopPositions}
              onChange={(e) => setStopPositions(e.target.value)}
              placeholder="e.g. 0,0.2,0.95"
            />
          </div>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 12 }}>
          {(() => {
            const Comp = Glasses[selectedGlass] || Glasses.WhiskeyShotGlass;
            let liquidStyle = undefined;
            try {
              if (liquidStyleText && liquidStyleText.trim())
                liquidStyle = JSON.parse(liquidStyleText);
            } catch (e) {
              // ignore parse errors; leave style undefined
            }

            return (
              <Comp
                size={size}
                strokeWidth={strokeWidth}
                liquidFill={[color1, color2, color3]}
                highlight={highlight}
                highlightColor={highlightColor}
                level={level}
                opacity={fillOpacity}
                idBase={idBase}
                gradientAttr={gradientAttr || null}
                liquidStyle={liquidStyle}
                stopPositions={
                  stopPositions
                    ? stopPositions.split(",").map((s) => Number(s.trim()))
                    : null
                }
                mixed={mixed}
                mixedBlend={mixedBlend}
                mixedOpacity={mixedOpacity}
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
}
