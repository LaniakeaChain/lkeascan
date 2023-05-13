import React from 'react';

import SearchBar from 'components/inputs/search-bar';
import { IUserProfile } from 'models/models-auth';
import { themed } from 'theming';

import { AccountInfo } from './account-info';

export interface IHeaderDesktopRightContentProps {
  userProfile: IUserProfile;
  searchText: string;
  isSearch: boolean;
  onSearchChange(searchText: string): void;
  onSearchFocus(isSearchFocused: boolean): void;
  onSearchExit(): void;
}

export function HeaderDesktopRightContent(props: IHeaderDesktopRightContentProps) {
  const { userProfile, ...searchBarProps } = props;
  return (
    <>
      <style jsx>{`
        div.HeaderDesktopRightContent {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          padding-right: 30px;
          width: 642px;
        }
        div.search-bar {
          height: 40px;
          width: 424px;
          margin-right: 36px;
        }
      `}</style>
      <div className="HeaderDesktopRightContent">
        <div className="search-bar">
          <SearchBar isHeader {...searchBarProps} />
        </div>
        {themed('profileEnabled') && <AccountInfo userProfile={userProfile} />}
      </div>
    </>
  );
}
