import React from 'react';

import { StatusConnect } from 'components/widgets/account-info-status';
import { BUTTON_GREY } from 'data/data-style';
import { IUserProfile } from 'models/models-auth';
import { defined } from 'utils/variable-evaluation';

import { AccountInfoLogoutButton } from './account-info-logout-button';
import { AccountInfoMetadataRegistryLink } from './account-info-metadata-registry';
import { AccountInfoStatus } from './account-info-status';
import { AccountInfoTitle } from './account-info-title';

interface Props {
  userProfile?: IUserProfile;
}

export function AccountInfoMenu(props: Props) {
  const isMetadataRegistryLink = process.env.ENABLE_PAID_FEATURES === 'enabled';
  return (
    <>
      <style jsx>{`
        div.AccountInfoMenu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          min-width: 240px;
          background-color: #fff;
          box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.05), 0 0 8px 0 rgba(0, 0, 0, 0.05);
          list-style: none;
        }
        div.top {
          padding: 24px 16px ${isMetadataRegistryLink ? 28 : 32}px;
        }
        div.line {
          width: 100%;
          height: 1px;
          background-color: ${BUTTON_GREY};
        }
      `}</style>
      <div className="AccountInfoMenu" onClick={(e) => e.stopPropagation()}>
        <div className="top">
          <AccountInfoTitle userProfile={props.userProfile} />
          <StatusConnect
            render={(nodeStatus) => (
              <AccountInfoStatus
                status={nodeStatus.status}
                latestBlock={nodeStatus.latestBlock}
                latestIndexedBlock={nodeStatus.latestIndexedBlock}
              />
            )}
          />
        </div>
        {isMetadataRegistryLink && <AccountInfoMetadataRegistryLink />}
        <div className="line" />
        {defined(props.userProfile) && <AccountInfoLogoutButton />}
      </div>
    </>
  );
}
