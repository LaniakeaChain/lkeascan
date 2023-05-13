import React, { useEffect, useState } from 'react';

import { CustomHead } from 'components/app-shell/custom-head';
import { NoScript } from 'components/app-shell/no-script';
import { GLOBAL_STYLES } from 'components/app-shell/styles';
import { ICON } from 'components/svg';
import {
  DESKTOP_WIDTH,
  FONT_MOBILE_FAMILY,
  MOBILE_SMALL_WIDTH,
  MOBILE_TEXT,
  TABLET_WIDTH,
  WHITE,
} from 'data/data-style';
import { defined } from 'utils/variable-evaluation';

import { NotFound404Info } from './not-found-404-info';

export function NotFound404() {
  const [width, setWidth] = useState(null);
  const [searchText, setSearchChange] = useState('');
  const [isSearch, setSearch] = useState(false);
  // const isSearch = false;

  useEffect(() => {
    setWidth(window.innerWidth);
    document.addEventListener('touchmove', (e) => e.preventDefault());
    return () => document.removeEventListener('touchmove', (e) => e.preventDefault());
  }, []);

  const isMobile = width < DESKTOP_WIDTH;
  const isSearchMobile = isMobile && isSearch;

  const handleSearch = (nextIsSearch: boolean) => {
    if (!nextIsSearch) {
      setSearchChange('');
    }

    setSearch(nextIsSearch);

    if (defined(window) && defined(document)) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  };

  return (
    <>
      {GLOBAL_STYLES}
      <CustomHead />
      <NoScript />
      <style jsx>{`
        div.NotFound404 {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          width: 100%;
          height: 100vh;
          font-family: ${FONT_MOBILE_FAMILY};
          background-color: ${WHITE};
          color: ${MOBILE_TEXT};
          z-index: 1;
        }
        div.icon-desktop {
          display: block;
        }
        div.icon-mobile {
          display: none;
        }
        div.icon-mobile-small {
          display: none;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.NotFound404 {
            flex-direction: ${isSearch ? 'column' : 'column-reverse'};
            text-align: center;
            justify-content: ${isSearch ? 'flex-start' : 'center'};
            height: ${isSearch ? 'auto' : '100vh'};
          }
          div.icon-desktop {
            display: none;
          }
          div.icon-mobile {
            display: block;
          }
          div.icon-mobile-small {
            display: none;
          }
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          div.icon-desktop {
            display: none;
          }
          div.icon-mobile {
            display: none;
          }
          div.icon-mobile-small {
            display: block;
          }
        }
      `}</style>
      <div className="NotFound404">
        <NotFound404Info
          width={width}
          isMobile={isMobile}
          isSearch={isSearch}
          isSearchMobile={isSearchMobile}
          searchText={searchText}
          onSearch={handleSearch}
          onSearchChange={setSearchChange}
        />
        {!isSearchMobile && (
          <>
            <div className="icon-desktop">{ICON.BrokenEther}</div>
            <div className="icon-mobile">{ICON.BrokenEtherSmall}</div>
            <div className="icon-mobile-small">{ICON.BrokenEtherExtraSmall}</div>
          </>
        )}
      </div>
    </>
  );
}
