import React from 'react';

import AppShell from 'components/app-shell';
import { TransactionDetails } from 'components/pages/transactions/transaction-details';

function Transactions() {
  return <AppShell render={() => <TransactionDetails />} />;
}

export default Transactions;
