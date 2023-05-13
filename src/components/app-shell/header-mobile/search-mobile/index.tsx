import { AnimatePresence, motion } from 'framer-motion';
import React, { CSSProperties } from 'react';

import SearchBar from 'components/inputs/search-bar';
import { LIGHT_PURPLE_TEXT, MOBILE_SMALL_WIDTH, TABLET_WIDTH } from 'data/data-style';

import { SearchMobileUnderline } from './search-mobile-underline';

export interface ISearchMobileProps {
  searchText: string;
  isSearch: boolean;
  onSearchChange(searchText: string): void;
  onSearchFocus(isSearchFocused: boolean): void;
  onSearchExit(): void;
  style?: CSSProperties;
  variant404?: string;
}

export function SearchMobile(props: ISearchMobileProps) {
  const { isSearch, onSearchExit, searchText, style, variant404, ...searchProps } = props;
  return (
    <>
      <style>{`
          div.search-bar {
            display: flex;
            flex-direction: row;
            position: absolute;
            left: 24px;
            top: 0;
            width: calc(100% - 48px);
            border-radius: 4px;
            overflow: hidden;
          }
          button.cancel {
            font-size: 14px;
            line-height: 16px;
            width: 46px;
            margin-left: 24px;
            color: ${LIGHT_PURPLE_TEXT};
          }
          @media (max-width: ${TABLET_WIDTH}px) {
            div.search-bar {
              left: 24px;
              width: calc(100% - 48px);
            }
          }
          @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
            div.search-bar {
              left: 20px;
              width: calc(100% - 40px);
            }
          }
        `}</style>
      <motion.div
        className="search-bar"
        style={style}
        initial={variant404 ? { y: 16 } : { y: 92 }}
        animate={variant404 || (isSearch ? 'search' : 'normal')}
        variants={{
          search: {
            y: 16,
          },
          normal: {
            y: 92,
          },
          search404: {
            y: 16,
          },
          normal404: {
            y: 16,
          },
        }}
      >
        <SearchBar
          isFullscreenSuggestions
          isCloseCross
          searchText={searchText}
          isSearch={isSearch}
          onSearchExit={onSearchExit}
          {...searchProps}
        />
        {isSearch && (
          <button onTouchStart={onSearchExit} onClick={onSearchExit} className="cancel">
            Cancel
          </button>
        )}
      </motion.div>
      <AnimatePresence>
        {isSearch && <SearchMobileUnderline key="SearchMobileUnderline" />}
      </AnimatePresence>
    </>
  );
}
