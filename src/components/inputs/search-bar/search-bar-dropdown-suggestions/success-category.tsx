import React from 'react';

import {
  BUTTON_GREY,
  MOBILE_GREY_TEXT,
  MOBILE_LIGHT_GREY,
  MOBILE_SMALL_WIDTH,
  TABLET_WIDTH,
} from 'data/data-style';
import { ISearchFetch } from 'models/models-data-search';

import { SearchBarDropdownSuccessItem } from './success-item';

interface Props {
  categoryIndex: number;
  highlightIndex: number;
  accIndex: number;
  title: string;
  items: ISearchFetch[];
  onLinkClick(item): void;
}

export function SearchBarDropdownSuccessCategory({
  accIndex,
  categoryIndex,
  highlightIndex,
  items,
  onLinkClick,
  title,
}: Props) {
  return (
    <>
      <style jsx>{`
        div.SearchBarDropdownSuccessCategory {
          padding: ${categoryIndex === 0 ? 16 : 0}px 0 16px;
          width: 100%;
        }
        div.underline {
          position: relative;
          top: 0;
          height: 1px;
          width: 100%;
          background-color: ${BUTTON_GREY};
          margin-bottom: ${categoryIndex === 0 ? 0 : 16}px;
        }
        h4 {
          font-size: 12px;
          line-height: 16px;
          padding: 0 0 8px 16px;
          color: ${MOBILE_GREY_TEXT};
        }
        ul {
          list-style-type: none;
          width: 100%;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          h4 {
            padding: 0 24px 8px 24px;
          }
          div.underline {
            left: 24px;
            width: calc(100% - 48px);
            background-color: ${MOBILE_LIGHT_GREY};
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          h4 {
            padding: 0 20px 8px 20px;
          }
          div.underline {
            left: 20px;
            width: calc(100% - 40px);
          }
        }
      `}</style>
      <div className="SearchBarDropdownSuccessCategory">
        {categoryIndex !== 0 && <div className="underline" />}
        <h4>{title}</h4>
        <ul>
          {items.map((item: ISearchFetch, index) => (
            <SearchBarDropdownSuccessItem
              key={`row-${index}`}
              index={accIndex + index}
              isHighlighted={accIndex + index === highlightIndex}
              onLinkClick={onLinkClick}
              item={item}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
