import React from 'react';

import AppShell from 'components/app-shell';
import AuthenticationCallback from 'components/auth/authentication-callback';

function Authenticating() {
  return <AppShell render={() => <AuthenticationCallback />} />;
}

export default Authenticating;
