import React, { useState } from 'react';

import { CopyToClipboard } from 'components/widgets/copy-to-clipboard';
import { RESET_CLIPBOARD_DELAY } from 'data/data-style';
import { useTimeout } from 'utils/use-timeout';

import { ToolTip } from '..';
import { ToolTipCopyIcon } from '../tool-tip-copy-icon';

interface Props {
  contentToCopy: string;
}

export function ToolTipCopyButton(props: Props) {
  const [isCopied, setIsCopied] = useState(null);
  const [copyTimeout] = useTimeout(RESET_CLIPBOARD_DELAY);

  return (
    <ToolTip>
      <>
        <CopyToClipboard
          contentToCopy={props.contentToCopy}
          onClick={(isSuccessful: boolean) => {
            setIsCopied(isSuccessful);
            copyTimeout(() => setIsCopied(false));
          }}
        >
          <ToolTipCopyIcon isCopied={isCopied} />
        </CopyToClipboard>
        {props.contentToCopy}
      </>
    </ToolTip>
  );
}
