import React from 'react';
import { kanjiCharacters } from '../data';
import KanjiLesson from './KanjiLesson';

const KanjiChart = () => {
  return (
    <section id="kanjiChart">
      <h3 className="font-bold mb-4 text-xl">Bảng chữ Kanji</h3>
      <div className="flex flex-col gap-4">
        {kanjiCharacters.map((lesson) => (
          <KanjiLesson
            key={lesson.url}
            data={lesson}
          />
        ))}
      </div>
    </section>
  );
};

export default KanjiChart;
