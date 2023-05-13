import React from 'react';

import AppShell from 'components/app-shell';
import { TransactionsTable } from 'components/pages/transactions/transactions-table';
import { TRANSACTIONS_HEADER_ITEMS } from 'data/table-lookup/data-transactions';

function Transactions() {
  return (
    <AppShell
      render={() => (
        <TransactionsTable
          fetchConfig={{
            apiLink: '/transactions',
            pathname: '/transactions',
            params: {},
          }}
          headerItems={TRANSACTIONS_HEADER_ITEMS}
        />
      )}
    />
  );
}

export default Transactions;
