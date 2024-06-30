import React from "react";
import { katakanaCharacters } from "../data";

const KatakanaChart = () => {
  return (
    <section id="katakanaChart">
      <h3 className="font-bold mb-4 text-xl">Bảng chữ cái Katakana</h3>

      <div className="chart-container grid-cols-5">
        {katakanaCharacters.basic.map((char, index) => (
          <div
            key={`id-${index}`}
            className={`chart-char-container ${
              char.character
                ? "chart-filled-container"
                : "chart-empty-container"
            }`}
          >
            {char.character}
            <span className="chart-romaji">{char.romaji}</span>
          </div>
        ))}
      </div>

      <hr className="chart-break" />

      <div className="chart-container grid-cols-5">
        {katakanaCharacters.diacritics.map((char, index) => (
          <div
            key={`id-${index}`}
            className="chart-char-container chart-filled-container"
          >
            {char.character}
            <span className="chart-romaji">{char.romaji}</span>
          </div>
        ))}
      </div>

      <hr className="chart-break" />

      <div className="chart-container grid-cols-3">
        {katakanaCharacters.contracted.map((char, index) => (
          <div
            key={`id-${index}`}
            className="chart-char-container chart-filled-container"
          >
            {char.character}
            <span className="chart-romaji">{char.romaji}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KatakanaChart;
