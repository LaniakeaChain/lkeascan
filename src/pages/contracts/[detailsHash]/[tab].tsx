import React from 'react';

import AppShell from 'components/app-shell';
import { ContractDetails } from 'components/pages/contracts/contract-details';

function Contracts() {
  return <AppShell render={() => <ContractDetails />} />;
}

export default Contracts;
