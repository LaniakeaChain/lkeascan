import React from 'react';

import { AccountInfoMetadataRegistryLink } from 'components/app-shell/header-desktop/account-info/account-info-metadata-registry';
import { MOBILE_SMALL_WIDTH } from 'data/data-style';

export function ProfileMetadata() {
  const isMetadataRegistryLink = process.env.ENABLE_PAID_FEATURES === 'enabled';

  if (isMetadataRegistryLink) {
    return (
      <>
        <style jsx>{`
          div.ProfileMetadata {
            position: relative;
            width: calc(100% + 48px);
            left: 0;
            margin-top: 28px;
          }
          @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
            div.ProfileMetadata {
              width: calc(100% + 40px);
            }
          }
        `}</style>
        <div className="ProfileMetadata">
          <AccountInfoMetadataRegistryLink />
        </div>
      </>
    );
  } else {
    return null;
  }
}
