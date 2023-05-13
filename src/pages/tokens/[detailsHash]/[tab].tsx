import React from 'react';

import AppShell from 'components/app-shell';
import { TokenDetails } from 'components/pages/tokens/tokens-details';

function Tokens() {
  return <AppShell render={() => <TokenDetails />} />;
}

export default Tokens;
