import jazzicon from '@metamask/jazzicon';
import React, { useEffect, useRef } from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { formatHash } from 'utils/format';

interface Props {
  account: string;
}

function MetaMaskAvatar({ account }: Props) {
  const avatarRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const element = avatarRef.current;

    if (element && account) {
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon = jazzicon(40, seed);

      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }

      element.appendChild(icon);
    }
  }, [account, avatarRef]);

  return (
    <ToolTipContentInline textStyle={{ fontSize: 12 }} contentToCopy={account}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span ref={avatarRef} />
        <span style={{ marginLeft: '0.5rem' }}>{formatHash(account)}</span>
      </div>
    </ToolTipContentInline>
  );
}

export default MetaMaskAvatar;
