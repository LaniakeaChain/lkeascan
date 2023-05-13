import React from 'react';

import AppShell from 'components/app-shell';
import { NodeDetails } from 'components/pages/node';
import { themed } from 'theming';

function Node() {
  return (
    <>
      {(themed('networkEnabled') || process.env.DISPLAY_NETWORK_TAB === 'enabled') && (
        <AppShell render={() => <NodeDetails />} />
      )}
    </>
  );
}

export default Node;
