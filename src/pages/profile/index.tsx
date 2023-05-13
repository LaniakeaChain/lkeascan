import React from 'react';

import AppShell from 'components/app-shell';
import { Profile } from 'components/pages/profile';
import { StatusConnect } from 'components/widgets/account-info-status';

function ProfilePage() {
  return (
    <AppShell
      render={({ userProfile }) => (
        <StatusConnect
          render={({ status }) => <Profile status={status} userProfile={userProfile} />}
        />
      )}
    />
  );
}

export default ProfilePage;
