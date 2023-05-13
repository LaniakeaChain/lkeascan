import classNames from 'classnames';
import React, { useCallback } from 'react';

import { TextTruncate } from 'components/text-truncate';
import { HOVER_BUTTON_GREY, MOBILE_SMALL_WIDTH, MOBILE_TEXT, TABLET_WIDTH } from 'data/data-style';
import { ISearchFetch } from 'models/models-data-search';

export function id(index) {
  return `SearchBarDropdownSuccessItem-${index}`;
}

interface SearchBarDropdownSuccessItemProps {
  index: number;
  isHighlighted: boolean;
  onLinkClick: (item: ISearchFetch) => void;
  item: ISearchFetch;
}

export function SearchBarDropdownSuccessItem({
  index,
  isHighlighted,
  item,
  onLinkClick,
}: SearchBarDropdownSuccessItemProps) {
  const onClick = useCallback(() => onLinkClick(item), [item, onLinkClick]);

  return (
    <>
      <style jsx>{`
        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          height: 32px;
        }
        button {
          display: block;
          color: ${MOBILE_TEXT};
          line-height: 16px;
          text-align: left;
          font-size: 14px;
          padding: 8px 16px;
          width: 100%;
          cursor: 'pointer';
        }
        button.isHighlighted {
          background-color: ${HOVER_BUTTON_GREY};
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          button {
            padding: 8px 24px;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          button {
            padding: 8px 20px;
          }
        }
      `}</style>
      <li>
        <button
          id={id(index)}
          className={classNames({ isHighlighted, '--interactions': true })}
          onClick={onClick}
        >
          <TextTruncate isToolTipDisabled>{item.link.display}</TextTruncate>
        </button>
      </li>
    </>
  );
}
