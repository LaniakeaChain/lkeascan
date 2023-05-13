import React from 'react';

import AppShell from 'components/app-shell';
import { ContractsTable } from 'components/pages/contracts/contracts-table';
import { CONTRACTS_HEADER_ITEMS } from 'data/table-lookup/data-contracts';

function Contracts() {
  return (
    <AppShell
      render={() => (
        <ContractsTable
          fetchConfig={{
            apiLink: '/contracts',
            pathname: '/contracts',
            params: {},
          }}
          headerItems={CONTRACTS_HEADER_ITEMS}
        />
      )}
    />
  );
}

export default Contracts;
