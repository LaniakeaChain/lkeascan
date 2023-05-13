import React from 'react';

import { TextTruncate } from 'components/text-truncate';
import { FONT_WEIGHT_TITLE } from 'data/data-style';
import { ISubtitleConfig } from 'models/models-details-general';

import { MobileOverviewContentCopyIcon } from './mobile-overview-content-copy-icon';

interface Props {
  zIndex: number;
  subtitleConfig: ISubtitleConfig;
}

export function MobileOverviewContentTitle(props: Props) {
  const { subtitleConfig, zIndex } = props;
  const { display, isNoCopyIcon, value } = subtitleConfig;

  return (
    <>
      <style jsx>{`
        div.MobileOverviewContentTitle {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 28px;
          font-weight: ${FONT_WEIGHT_TITLE};
          z-index: ${zIndex};
        }
        div.label {
          font-size: 24px;
          line-height: 28px;
          margin-right: 12px;
          max-width: 100%;
        }
      `}</style>
      <div className="MobileOverviewContentTitle">
        <div className="label">
          <TextTruncate isToolTipDisabled>{display || value}</TextTruncate>
        </div>
        {!isNoCopyIcon && <MobileOverviewContentCopyIcon subtitleValue={value} />}
      </div>
    </>
  );
}
