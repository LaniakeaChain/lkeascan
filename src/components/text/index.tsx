import React, { CSSProperties } from 'react';

import { LIGHT_GREY_TEXT } from 'data/data-style';

interface Props {
  style?: CSSProperties;
  children: JSX.Element[];
}

export function DefinitionList(props: Props) {
  const { children, style } = props;
  return (
    <>
      <style jsx>{`
        dl.DL {
          display: flex;
          flex-flow: row wrap;
          font-size: 14px;
          line-height: 32px;
          margin-bottom: 2rem;
        }
        dl.DL > :global(dt) {
          color: ${LIGHT_GREY_TEXT};
          flex-basis: 15%;
        }
        dl.DL > :global(dd) {
          flex-basis: 80%;
        }
        @media only screen and (max-width: 768px) {
          dl.DL {
            flex-flow: column wrap;
          }
        }
      `}</style>
      <dl style={style} className="DL">
        {children}
      </dl>
    </>
  );
}
