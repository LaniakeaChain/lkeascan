import React, { useState } from 'react';

import { ICON } from 'components/svg';
import { ToolTip } from 'components/tool-tip';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { ISubtitleConfig } from 'models/models-details-general';

interface Props {
  subtitleConfig: ISubtitleConfig;
  onToggle(): void;
}

export function DesktopOverviewContentMenuIcon(props: Props) {
  const { onToggle } = props;
  const [isHovered, setHover] = useState(false);
  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentMenuIcon {
          position: relative;
          width: 32px;
          height: 32px;
          z-index: 1;
        }
        div.DesktopOverviewContentMenuIcon :global(.Tooltip) {
          display: none;
        }
        div.DesktopOverviewContentMenuIcon:hover :global(.Tooltip) {
          display: inline-flex;
        }
      `}</style>
      <div
        className="DesktopOverviewContentMenuIcon"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <InteractiveButton onClick={onToggle} style={{ width: 32, height: 32, borderRadius: 16 }}>
          {ICON.ThreeDots}
        </InteractiveButton>
        {isHovered && <ToolTip style={{ marginTop: 12 }}>Show more</ToolTip>}
      </div>
    </>
  );
}
