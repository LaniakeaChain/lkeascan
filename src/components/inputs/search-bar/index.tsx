import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { CSSProperties, ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import { INPUT_GREY, INPUT_TEXT_GREY, MOBILE_SMALL_WIDTH, TABLET_WIDTH } from 'data/data-style';
import { IError } from 'models/models-data-general';
import { ISearchResultsFetch } from 'models/models-data-search';
import { fetchData } from 'utils/api/queries';
import { toNextLink } from 'utils/links';
import useOnClickOutside from 'utils/use-on-click-outside';
import { useThrottledValue } from 'utils/use-throttled-value';

import { SearchBarAddOns } from './search-bar-add-ons';
import { SearchBarContent } from './search-bar-content';
import { MAX_HEIGHT_SUGGESTIONS } from './search-bar-dropdown-suggestions';
import { id } from './search-bar-dropdown-suggestions/success-item';

const isSearchable = (event: React.KeyboardEvent<HTMLInputElement>) =>
  /[a-zA-Z0-9-_ ]/.test(String.fromCharCode(event.keyCode));

interface Props {
  isFullscreenSuggestions?: boolean;
  style?: CSSProperties;
  isCloseCross?: boolean;
  isHeader?: boolean;
  isSearch: boolean;
  searchText: string;
  onSearchChange(searchText: string): void;
  onSearchFocus?(isSearchFocused: boolean): void;
  onSearchExit?(): void;
}

function SearchBar({
  isCloseCross,
  isFullscreenSuggestions,
  isHeader,
  isSearch,
  onSearchChange,
  onSearchExit,
  onSearchFocus,
  searchText,
  style,
}: Props) {
  const router = useRouter();
  const searchBarRef = useRef();
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [isFocused, setFocus] = useState(null);
  const [checkForSingleResult, setCheckForSingleResult] = useState(false);

  const throttledValue = useThrottledValue(searchText, 1000);

  const { data, error } = useSWR<ISearchResultsFetch, IError>(
    throttledValue ? `/search?query=${encodeURIComponent(throttledValue)}` : null,
    fetchData,
  );

  const inputRef = useRef<HTMLInputElement>();
  const parentRef = useRef<HTMLDivElement>();

  const handleExitSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }

    setHighlightIndex(null);
    setCheckForSingleResult(false);

    if (onSearchExit) {
      onSearchExit();
    }
  }, [onSearchExit]);

  useOnClickOutside(searchBarRef, handleExitSearch, isFullscreenSuggestions);

  const selectItemWithIndex = useCallback(
    (item) => {
      if (typeof item === 'object' && 'link' in item) {
        const link = toNextLink(item.link);
        router.push(link.nextLinkConfig.href, link.nextLinkConfig.as);
      } else if (typeof item === 'number') {
        // XXX hack
        const el = document.getElementById(id(item));

        if (el) {
          el.click();
        }
      }
    },
    [router],
  );

  useEffect(() => {
    if (throttledValue && checkForSingleResult && data) {
      setCheckForSingleResult(false);

      if (data.data.length === 1) {
        selectItemWithIndex(0);
      }
    }
  }, [checkForSingleResult, data, router, selectItemWithIndex, throttledValue]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    onSearchChange(value);
  };

  const maxHeight = isHeader ? MAX_HEIGHT_SUGGESTIONS.header : MAX_HEIGHT_SUGGESTIONS.other;

  const isSuggestionsScrollable =
    parentRef && parentRef.current && parentRef.current.scrollHeight > maxHeight;

  const isSuggestions = data && data.data && data.data.length > 0;
  const maxIndex = isSuggestions && data.data.length - 1;

  const handleMoveUp = () => {
    if (highlightIndex !== null) {
      const nextIndex = highlightIndex === 0 ? maxIndex : highlightIndex - 1;
      setHighlightIndex(nextIndex);

      if (isSuggestionsScrollable) {
        const childElement = document.getElementById(id(nextIndex));

        parentRef.current.scrollTop =
          childElement.offsetTop - maxHeight * 0.5 - childElement.clientHeight;
      }
    }
  };

  const handleMoveDown = () => {
    if (highlightIndex !== null) {
      const nextIndex = highlightIndex === maxIndex ? 0 : highlightIndex + 1;
      setHighlightIndex(nextIndex);

      if (isSuggestionsScrollable) {
        const childElement = document.getElementById(id(nextIndex));

        parentRef.current.scrollTop =
          childElement.offsetTop - maxHeight * 0.5 + childElement.clientHeight;
      }
    } else {
      setHighlightIndex(0);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (highlightIndex !== null) {
        selectItemWithIndex(highlightIndex);
      } else {
        setCheckForSingleResult(true);
      }
    } else if (e.key === 'Escape') {
      handleExitSearch();
    } else if (isSearchable(e)) {
      setHighlightIndex(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSuggestions) {
      if (e.key === 'ArrowDown') {
        handleMoveDown();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        handleMoveUp();
        e.preventDefault();
      }
    }
  };

  const handleFocus = (nextIsFocused: boolean) => {
    setFocus(nextIsFocused);

    if (onSearchFocus) {
      onSearchFocus(nextIsFocused);
    }
  };

  const handleEmptySearch = () => {
    setHighlightIndex(null);
    onSearchChange('');
  };

  return (
    <>
      <style jsx>{`
        div.SearchBar {
          position: relative;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          width: calc(100% - 23px);
          padding: 0 12px 0 11px;
          height: 40px;
          background-color: ${INPUT_GREY};
          color: ${INPUT_TEXT_GREY};
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.SearchBar {
            height: 32px;
          }
        }
        div.SearchBar.isHeader {
          width: calc(100% - 43px);
          padding: 0 27px 0 16px;
          background-color: rgba(235, 235, 235, 0.3);
          border-radius: 0;
          color: rgab(255, 255, 255, 0.8);
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.SearchBar {
            width: calc(100% - 17px);
            padding: 0 9px 0 8px;
            border-radius: 4px;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          div.SearchBar {
            width: calc(100% - 13px);
            padding: 0 8px 0 7px;
          }
        }
      `}</style>
      <div
        ref={searchBarRef}
        className={classNames('SearchBar', { isHeader, isSearch })}
        style={style}
      >
        <SearchBarContent
          handleRef={inputRef}
          isHeader={isHeader}
          isFocused={isFocused}
          value={searchText}
          onFocus={() => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          onChange={handleSearchChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        <SearchBarAddOns
          isHeader={isHeader}
          isFullscreenSuggestions={isFullscreenSuggestions}
          isSearch={isSearch}
          searchText={searchText}
          isCloseCross={isCloseCross}
          highlightIndex={highlightIndex}
          searchSuggestions={data}
          error={error}
          onLinkClick={selectItemWithIndex}
          onEmptySearch={handleEmptySearch}
          parentRef={parentRef}
        />
      </div>
    </>
  );
}

export default SearchBar;
