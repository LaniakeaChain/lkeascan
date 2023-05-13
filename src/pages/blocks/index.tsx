import React from 'react';

import AppShell from 'components/app-shell';
import { BlocksTable } from 'components/pages/blocks/blocks-table';

function Blocks() {
  return (
    <AppShell
      render={() => (
        <BlocksTable
          fetchConfig={{
            apiLink: '/blocks',
            pathname: '/blocks',
            params: {},
          }}
        />
      )}
    />
  );
}

export default Blocks;
