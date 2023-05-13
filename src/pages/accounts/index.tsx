import React from 'react';

import AppShell from 'components/app-shell';
import { WipPage } from 'components/wip';

function Accounts() {
  return <AppShell render={() => <WipPage />} />;
}

export default Accounts;
