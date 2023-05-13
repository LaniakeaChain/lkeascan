import classNames from 'classnames';
import React from 'react';

import { HeaderMobileTop } from './header-mobile-top';
import { ISearchMobileProps, SearchMobile } from './search-mobile';

interface Props extends ISearchMobileProps {
  isDetails: boolean;
  pageName: string;
}

export function HeaderMobile(props: Props) {
  const { isDetails, isSearch, pageName } = props;

  return (
    <>
      <style jsx>{`
        header {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px 58px;
          width: calc(100% - 48px);
          min-height: 58px;
          background-color: #fff;
          z-index: 1;
        }
        header.isSearch {
          height: 64px;
          width: 100%;
          padding: 0;
          background-color: #fff;
        }
      `}</style>
      <header className={classNames({ isSearch })}>
        {!isSearch && <HeaderMobileTop isDetails={isDetails} pageName={pageName} />}
        <SearchMobile {...props} />
      </header>
    </>
  );
}
