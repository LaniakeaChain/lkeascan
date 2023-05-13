import classNames from 'classnames';
import React, { RefObject } from 'react';

import { LoadingSpinner } from 'components/placeholders/loading-spinner';
import { TABLET_WIDTH } from 'data/data-style';
import { IError } from 'models/models-data-general';
import { ISearchResultsFetch } from 'models/models-data-search';

import { SearchBarDropdownError } from './error';
import { SearchBarDropdownSuccess } from './success';

export const MAX_HEIGHT_SUGGESTIONS = {
  header: 320,
  other: 240,
};

interface Props {
  isHeader: boolean;
  highlightIndex: number;
  error: IError;
  searchSuggestions?: ISearchResultsFetch;
  onLinkClick(item): void;
  isFullscreen?: boolean;
  handleParentRef?: RefObject<HTMLDivElement>;
}

export function SearchBarDropdownSuggestions({
  error,
  handleParentRef,
  highlightIndex,
  isFullscreen,
  isHeader,
  onLinkClick,
  searchSuggestions,
}: Props) {
  const maxHeight = () => {
    if (isFullscreen) {
      return 'none';
    } else if (isHeader) {
      return `${MAX_HEIGHT_SUGGESTIONS.header}px`;
    } else {
      return `${MAX_HEIGHT_SUGGESTIONS.other}px`;
    }
  };

  return (
    <>
      <style jsx>{`
        div.SearchBarDropdownSuggestions {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 100%;
          max-height: ${maxHeight()};
          background-color: #fff;
          overflow-y: auto;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0494509), 0px 5px 8px rgba(0, 0, 0, 0.1);
          z-index: 0;
        }
        div.SearchBarDropdownSuggestions.isFullscreen {
          top: 64px;
          box-shadow: none;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.SearchBarDropdownSuggestions {
            top: 64px;
          }
        }
      `}</style>
      <div
        ref={handleParentRef}
        className={classNames('SearchBarDropdownSuggestions', { isFullscreen })}
      >
        {!error && !searchSuggestions && (
          <LoadingSpinner style={{ width: 34, height: 34, margin: '24px auto' }} />
        )}
        {error && <SearchBarDropdownError />}
        {searchSuggestions && (
          <SearchBarDropdownSuccess
            isFullscreen={isFullscreen}
            highlightIndex={highlightIndex}
            data={searchSuggestions.data}
            onLinkClick={onLinkClick}
          />
        )}
      </div>
    </>
  );
}
