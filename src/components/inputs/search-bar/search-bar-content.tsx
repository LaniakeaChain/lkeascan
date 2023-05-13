import classNames from 'classnames';
import React, { InputHTMLAttributes, RefObject } from 'react';

import { ICON } from 'components/svg';
import { TABLET_WIDTH } from 'data/data-style';
import { isSafariMobile } from 'utils/detectors';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isFocused: boolean;
  isHeader?: boolean;
  handleRef: RefObject<HTMLInputElement>;
}

export function SearchBarContent(props: Props) {
  const { handleRef, isFocused, isHeader, ...remainingProps } = props;

  return (
    <>
      <style jsx>{`
        div {
          position: relative;
          width: calc(100% - 8px);
          margin-left: 8px;
          height: 22px;
          overflow: hidden;
        }
        input {
          position: relative;
          top: 0;
          left: 0;
          font-size: 12px;
          line-height: 16px;
          width: 100%;
          height: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: inherit;
          overflow: hidden;
        }
        input.isHeader {
          color: #fff;
        }
        button {
          color: #999999;
          cursor: default;
        }
        button.isHeader {
          color: #dfdefd;
        }
        button.isHeader.isFocused {
          color: #fff;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          input.isHeader button {
            color: #999999;
          }
          input.isSafari {
            /*
                hack from https://thingsthemselves.com/no-input-zoom-in-safari-on-iphone-the-pixel-perfect-way/
                to disable safari input zoom on font-size < 16px
                enlarge by 16/12 = 133.33%
              */
            position: absolute;
            font-size: 16px; /* 12px */
            line-height: 21.33px; /* 16px */
            width: 133.33%; /* 100% */
            height: 133.33%; /* 100% */
            top: -16.67%;
            left: 0;
            /* scale down by 12/16 = 75% */
            transform: scale(0.75);
            transform-origin: 0 50%;
          }
        }
      `}</style>
      <>
        <div>
          <input
            className={classNames('SearchBarContent', { isHeader, isSafari: isSafariMobile() })}
            ref={handleRef}
            type="text"
            placeholder="Search by address, token, transaction hash, or block number"
            name="search-bar"
            autoComplete="off"
            {...remainingProps}
          />
        </div>
        <button className={classNames({ isFocused, isHeader })}>{ICON.Search}</button>
      </>
    </>
  );
}
