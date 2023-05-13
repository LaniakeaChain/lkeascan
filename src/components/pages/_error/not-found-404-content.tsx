import React, { CSSProperties } from 'react';

import { ISearchMobileProps, SearchMobile } from 'components/app-shell/header-mobile/search-mobile';
import SearchBar from 'components/inputs/search-bar';
import { MOBILE_SMALL_WIDTH, TABLET_WIDTH } from 'data/data-style';
import { defined } from 'utils/variable-evaluation';

export interface INotFound404ContentProps {
  isSearchMobile: boolean;
  isMobile: boolean;
  isSearch: boolean;
  width: number;
  searchText: string;
  onSearchChange(searchText: string): void;
  onSearch(isSearchFocused: boolean): void;
}

export function NotFound404Content(props: INotFound404ContentProps) {
  const { isMobile, isSearch, isSearchMobile, onSearch, onSearchChange, searchText, width } = props;
  const handleSearchExit = () => onSearch(false);

  const handleSearchFocus = (isSearchFocused: boolean) => {
    if (isSearchFocused) {
      onSearch(true);
    }
  };

  const searchProps: ISearchMobileProps = {
    isSearch,
    searchText,
    onSearchChange,
    onSearchFocus: handleSearchFocus,
    onSearchExit: handleSearchExit,
    variant404: isSearchMobile ? 'search404' : 'normal404',
  };

  let searchMobileStyle: CSSProperties = {
    top: isSearchMobile ? 0 : -16,
    width: 'calc(100% - 48px)',
    height: isSearchMobile ? 32 : 42,
  };

  if (!isSearchMobile) {
    searchMobileStyle['left'] = 24;
  } else {
    const { left, ...remainingProps } = searchMobileStyle;
    searchMobileStyle = remainingProps;
  }

  return (
    <>
      <style jsx>{`
        div.NotFound404Content {
          position: ${isSearchMobile ? 'static' : 'relative'};
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          width: 100%;
        }
        p.text {
          font-size: 16px;
          line-height: 24px;
          width: 560px;
          margin: 32px 0 0 0;
        }
        div.search-bar-wrapper-mobile {
          position: ${isSearchMobile ? 'fixed' : 'relative'};
          top: 0;
          left: 0;
          width: calc(100% - 48px);
          padding: ${isSearchMobile ? '16px 24px' : '0 24px'};
          background-color: ${isSearchMobile ? '#fff' : 'transparent'};
          height: ${isSearchMobile ? 32 : 42}px;
          z-index: 1;
        }
        div.search-bar-wrapper-desktop {
          position: relative;
          margin-top: 36px;
          border-radius: 4px;
          width: 399px;
          bottom: 0;
          background-color: #fff;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.NotFound404Content {
            align-items: center;
          }
          p.text {
            margin: 28px 0 42px;
            font-size: 14px;
            line-height: 20px;
            width: 327px;
          }
          div.search-bar {
            width: ${isSearchMobile ? width - 48 : 327}px;
            margin-top: 42px;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          p.text {
            width: 256px;
            margin: 32px 0 42px;
          }
          div.search-bar {
            width: ${isSearchMobile ? width - 40 : 272}px;
          }
          div.search-bar-wrapper-mobile {
            width: ${isSearchMobile ? 'calc(100% - 40px)' : 'calc(100% - 48px)'};
            padding: ${isSearchMobile ? '16px 20px' : '0 24px'};
          }
        }
      `}</style>
      <div className="NotFound404Content">
        {!isSearchMobile && (
          <p className="text">
            Check that you typed the address correctly, go back to your previous page or try using
            the search box below to find something specific.
          </p>
        )}
        {isMobile ? (
          <>
            {defined(width) && (
              <div className="search-bar-wrapper-mobile">
                <SearchMobile style={searchMobileStyle} {...searchProps} />
              </div>
            )}
          </>
        ) : (
          <div className="search-bar-wrapper-desktop">
            <SearchBar {...searchProps} />
          </div>
        )}
      </div>
    </>
  );
}
