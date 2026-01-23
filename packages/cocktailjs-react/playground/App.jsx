import React, { useState } from "react";
import { WhiskeyShotGlass } from "@cocktailsrc";

export default function App() {
  const [size, setSize] = useState(200);
  const [strokeWidth, setStrokeWidth] = useState(0.5);
  const [color1, setColor1] = useState("#FFFFFF");
  const [color2, setColor2] = useState("#E0E0E0");
  const [color3, setColor3] = useState("#C0C0C0");
  const [highlight, setHighlight] = useState(null);
  const [highlightColor, setHighlightColor] = useState("#fff7c0");
  const [level, setLevel] = useState(1);
  const [stopPositions, setStopPositions] = useState("");

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
          <WhiskeyShotGlass
            size={size}
            strokeWidth={strokeWidth}
            liquidFill={[color1, color2, color3]}
            highlight={highlight}
            highlightColor={highlightColor}
            level={level}
            stopPositions={
              stopPositions
                ? stopPositions.split(",").map((s) => Number(s.trim()))
                : null
            }
          />
        </div>
      </div>
    </div>
  );
}
