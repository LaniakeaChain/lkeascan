import React from 'react';

import { IUserProfile } from 'models/models-auth';
import { ESyncStatus } from 'models/models-data-general';
import { defined } from 'utils/variable-evaluation';

import { ProfileAccountInfo } from './profile-account-info';
import { ProfileLogout } from './profile-logout';
import { ProfileMetadata } from './profile-metadata';
import { ProfileStatus } from './profile-status';

interface Props {
  status: ESyncStatus;
  userProfile: IUserProfile;
}

export function Profile(props: Props) {
  const { status, userProfile } = props;
  return (
    <>
      <style jsx>{`
        div.ProfileOverview {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div className="ProfileOverview">
        <ProfileAccountInfo userProfile={userProfile} />
        <ProfileStatus status={status} />
        <ProfileMetadata />
        {defined(userProfile) && <ProfileLogout />}
      </div>
    </>
  );
}
