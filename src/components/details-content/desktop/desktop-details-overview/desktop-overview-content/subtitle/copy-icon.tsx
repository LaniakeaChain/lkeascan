import React, { useState } from 'react';

import { ICON } from 'components/svg';
import { ToolTip } from 'components/tool-tip';
import { CopyToClipboard } from 'components/widgets/copy-to-clipboard';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { RESET_CLIPBOARD_DELAY } from 'data/data-style';
import { ISubtitleConfig } from 'models/models-details-general';
import { useTimeout } from 'utils/use-timeout';

interface DesktopOverviewContentCopyIconProps {
  subtitleConfig: ISubtitleConfig;
}

export function DesktopOverviewContentCopyIcon({
  subtitleConfig,
}: DesktopOverviewContentCopyIconProps) {
  const [isCopiedTooltip, setCopyTooltip] = useState(false);
  const [isHovered, setHover] = useState(false);

  const [clipboardTimeout] = useTimeout(RESET_CLIPBOARD_DELAY);

  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentCopyIcon {
          position: relative;
          width: 32px;
          height: 32px;
          z-index: 1;
        }
      `}</style>
      <div
        className="DesktopOverviewContentCopyIcon"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CopyToClipboard
          contentToCopy={subtitleConfig.value}
          onClick={(isCopiedSuccess: boolean) => {
            setCopyTooltip(isCopiedSuccess);
            clipboardTimeout(() => setCopyTooltip(false));
          }}
        >
          <InteractiveButton style={{ width: 32, height: 32, borderRadius: 16 }}>
            {ICON.Copy}
          </InteractiveButton>
        </CopyToClipboard>
        {(isCopiedTooltip || isHovered) && (
          <ToolTip style={{ marginTop: 12 }}>
            {isCopiedTooltip ? 'Copied!' : subtitleConfig.copyText || 'Copy address'}
          </ToolTip>
        )}
      </div>
    </>
  );
}
