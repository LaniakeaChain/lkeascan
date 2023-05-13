import React from 'react';

import AppShell from 'components/app-shell';
import { AccountDetails } from 'components/pages/accounts/account-details';

function Accounts() {
  return <AppShell render={() => <AccountDetails />} />;
}

export default Accounts;
