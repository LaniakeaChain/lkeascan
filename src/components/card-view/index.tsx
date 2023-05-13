import React, { CSSProperties } from 'react';

import { MAIN_TABLE_PADDING, WHITE } from 'data/data-style';

interface Props {
  style?: CSSProperties;
  children: JSX.Element | JSX.Element[];
}

export function CardView(props: Props) {
  const { children, style } = props;
  return (
    <>
      <style jsx>{`
        div.CardView {
          position: relative;
          padding: ${MAIN_TABLE_PADDING}px;
          background-color: ${WHITE};
          box-shadow: 0px 2px 10px 0 rgba(50, 64, 77, 0.1);
          -webkit-overflow-scrolling: touch;
          flex-grow: 1;
        }
      `}</style>
      <div style={style} className="CardView">
        {children}
      </div>
    </>
  );
}
