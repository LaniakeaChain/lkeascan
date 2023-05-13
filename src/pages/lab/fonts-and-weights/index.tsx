import React, { useState } from 'react';

import { GLOBAL_STYLES } from 'components/app-shell/styles';
import { FONT_FAMILY } from 'data/data-style';

function createArray(length: number): void[] {
  return new Array(length).fill(undefined);
}

export default () => {
  const [fontSize, setFontSize] = useState(16);
  return (
    <>
      {GLOBAL_STYLES}
      <div style={{ padding: 20 }}>
        <h1>Fonts and weights</h1>
        <div>
          <h4>{fontSize}</h4>
          <input
            type="range"
            min={10}
            max={100}
            value={fontSize}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setFontSize(value);
            }}
          />
        </div>
        <h3>Inter</h3>
        <ul>
          <style jsx>{`
            li {
              font-family: ${FONT_FAMILY};
            }
          `}</style>
          {createArray(9).map((_, index: number) => (
            <li
              key={`li-${index}`}
              style={{ fontWeight: (index + 1) * 100, fontSize }}
            >{`font-weight: ${(index + 1) * 100}`}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
