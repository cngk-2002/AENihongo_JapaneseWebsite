import React from 'react';
import { hiraganaCharacters } from '../data';

const HiraganaChart = () => {
  return (
    <section id="hiraganaChart">
      <h3 className="font-bold mb-4 text-xl">Bảng chữ cái Hiragana</h3>

      <div className="chart-container grid-cols-5">
        {hiraganaCharacters.basic.map((char, index) => (
          <div
            key={`id-${index}`}
            className={`chart-char-container ${char.character ? 'chart-filled-container' : 'chart-empty-container'}`}
          >
            {char.character}
            <span className="chart-romaji">{char.romaji}</span>
          </div>
        ))}
      </div>

      <hr className="chart-break" />

      <div className="chart-container grid-cols-5">
        {hiraganaCharacters.diacritics.map((char, index) => (
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
        {hiraganaCharacters.contracted.map((char, index) => (
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

export default HiraganaChart;
