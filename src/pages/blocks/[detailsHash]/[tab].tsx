import React from 'react';

import AppShell from 'components/app-shell';
import { BlockDetails } from 'components/pages/blocks/block-details';

function Blocks() {
  return <AppShell render={() => <BlockDetails />} />;
}

export default Blocks;
