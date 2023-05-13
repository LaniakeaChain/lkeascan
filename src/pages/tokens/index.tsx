import React from 'react';

import AppShell from 'components/app-shell';
import { TokensTable } from 'components/pages/tokens/tokens-table';

function Tokens() {
  return (
    <AppShell
      render={() => (
        <TokensTable
          fetchConfig={{
            apiLink: '/tokens',
            pathname: '/tokens',
            params: {},
          }}
        />
      )}
    />
  );
}

export default Tokens;
