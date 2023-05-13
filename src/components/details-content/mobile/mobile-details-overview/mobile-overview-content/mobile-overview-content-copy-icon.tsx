import React, { useState } from 'react';

import { ICON } from 'components/svg';
import { ToolTip } from 'components/tool-tip';
import { CopyToClipboard } from 'components/widgets/copy-to-clipboard';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { RESET_CLIPBOARD_DELAY } from 'data/data-style';
import { useTimeout } from 'utils/use-timeout';

interface Props {
  subtitleValue: string;
}

export function MobileOverviewContentCopyIcon(props: Props) {
  const [isCopiedTooltip, setCopyTooltip] = useState(false);
  const [copyTooltipTimeout] = useTimeout(RESET_CLIPBOARD_DELAY);
  return (
    <>
      <style jsx>{`
        div.MobileOverviewContentCopyIcon {
          position: relative;
          width: 34px;
          height: 34px;
          z-index: 1;
        }
      `}</style>
      <div className="MobileOverviewContentCopyIcon">
        <CopyToClipboard
          contentToCopy={props.subtitleValue}
          onClick={(isCopiedSuccess: boolean) => {
            setCopyTooltip(isCopiedSuccess);
            copyTooltipTimeout(() => setCopyTooltip(false));
          }}
        >
          <InteractiveButton style={{ width: 34, height: 34, borderRadius: 17 }}>
            {ICON.Copy}
          </InteractiveButton>
        </CopyToClipboard>
        {isCopiedTooltip && (
          <ToolTip style={{ marginTop: 12, display: 'inline-flex' }}>Copied!</ToolTip>
        )}
      </div>
    </>
  );
}
