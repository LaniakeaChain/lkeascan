import React from 'react';

import { TABLET_WIDTH } from 'data/data-style';

import { INotFound404ContentProps, NotFound404Content } from './not-found-404-content';
import { NotFound404Links } from './not-found-404-links';
import { NotFound404Title } from './not-found-404-title';

export function NotFound404Info(props: INotFound404ContentProps) {
  const { isSearchMobile } = props;
  return (
    <>
      <style jsx>{`
        div.NotFound404Info {
          margin: 0 84px 0 0;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.NotFound404Info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 48px 0 0 0;
            width: 100%;
          }
        }
      `}</style>
      <div className="NotFound404Info">
        {!isSearchMobile && <NotFound404Title />}
        <NotFound404Content {...props} />
        {!isSearchMobile && <NotFound404Links />}
      </div>
    </>
  );
}
