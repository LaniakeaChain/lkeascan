import React from 'react';

import { DARK_PURPLE, MOBILE_TEXT, TABLET_WIDTH } from 'data/data-style';

interface Props {
  children: string;
}

export function Title(props: Props) {
  return (
    <>
      <style jsx>{`
        h4.Title {
          color: ${DARK_PURPLE};
          font-size: 24px;
          line-height: 28px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          h4.Title {
            color: ${MOBILE_TEXT};
            font-size: 16px;
            line-height: 20px;
            font-weight: 500;
          }
        }
      `}</style>
      <h4 className="Title">{props.children}</h4>
    </>
  );
}
