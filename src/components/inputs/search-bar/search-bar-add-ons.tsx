import React, { RefObject } from 'react';
import { createPortal } from 'react-dom';

import { IError } from 'models/models-data-general';
import { ISearchResultsFetch } from 'models/models-data-search';

import { CancelCircle } from './cancel-circle';
import { SearchBarDropdownSuggestions } from './search-bar-dropdown-suggestions';

interface Props {
  error?: IError;
  isHeader: boolean;
  isFullscreenSuggestions: boolean;
  isSearch: boolean;
  searchText: string;
  isCloseCross: boolean;
  highlightIndex: number;
  searchSuggestions?: ISearchResultsFetch;
  onLinkClick(item): void;
  onEmptySearch(): void;
  parentRef: RefObject<HTMLDivElement>;
}

export function SearchBarAddOns(props: Props) {
  const {
    error,
    highlightIndex,
    isCloseCross,
    isFullscreenSuggestions,
    isHeader,
    isSearch,
    onEmptySearch,
    onLinkClick,
    parentRef,
    searchSuggestions,
    searchText,
  } = props;

  const dropdownProps = {
    highlightIndex,
    error,
    searchText,
    searchSuggestions,
    onLinkClick,
    isHeader,
  };

  return (
    <>
      {searchText &&
        (isFullscreenSuggestions ? (
          <>
            {isSearch &&
              createPortal(
                <SearchBarDropdownSuggestions isFullscreen {...dropdownProps} />,
                document.body,
              )}
          </>
        ) : (
          <>
            {isSearch && (
              <SearchBarDropdownSuggestions handleParentRef={parentRef} {...dropdownProps} />
            )}
          </>
        ))}
      {isCloseCross && Boolean(searchText) && (
        <CancelCircle onTouchStart={onEmptySearch} onClick={onEmptySearch} />
      )}
    </>
  );
}
