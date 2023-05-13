import React from 'react';

import { TextTruncate } from 'components/text-truncate';
import { DARK_PURPLE } from 'data/data-style';

interface Props {
  children: string;
}

export function DesktopOverviewContentMenuLabel(props: Props) {
  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContentMenuLabel {
          color: ${DARK_PURPLE};
          font-size: 18px;
          line-height: 22px;
          margin-right: 16px;
          width: calc(100% - 64px);
        }
      `}</style>
      <div className="DesktopOverviewContentMenuLabel">
        <TextTruncate isToolTipDisabled>{props.children}</TextTruncate>
      </div>
    </>
  );
}
