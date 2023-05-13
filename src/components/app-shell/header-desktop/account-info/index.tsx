import React from 'react';

import { ICON } from 'components/svg';
import { WHITE } from 'data/data-style';

import { AccountInfoMenuControl, IAccountInfoMenuControlProps } from './account-info-menu-control';

export function AccountInfo(props: IAccountInfoMenuControlProps) {
  return (
    <>
      <style jsx>{`
        div.AccountInfo {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: ${WHITE};
        }
        div.avatar {
          width: 24px;
          height: 24px;
          margin-right: 8px;
          background-color: #e3e3e3;
          border-radius: 12px;
          opacity: 0.94;
          overflow: hidden;
        }
        div.avatar img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="AccountInfo">
        <div className="avatar">{ICON.Avatar}</div>
        <AccountInfoMenuControl {...props} />
      </div>
    </>
  );
}
