import React from 'react';

import { FlexView } from 'components/composable/flex-view';
import { ICONS } from 'components/svg/icons';
import { TypeTag } from 'components/type-tags';
import { DARK_PURPLE } from 'data/data-style';
import { IOverviewContentProps } from 'models/models-details-general';

import { DesktopAdditionalDetailsButton } from '../desktop-additional-details/desktop-additional-details-button';
import { DesktopOverviewInfo } from '../desktop-overview-info';

import { DesktopOverviewContentSubtitle } from './subtitle';

export function DesktopOverviewContent(props: IOverviewContentProps) {
  const {
    additionalDetails,
    hashLabelConfig,
    info,
    isAdditionalDetailsOpen,
    onAdditionalDetailsClick,
    subtitleConfig,
    titleConfig,
  } = props;

  return (
    <>
      <style jsx>{`
        div.DesktopOverviewContent {
          display: flex;
          align-items: center;
          color: ${DARK_PURPLE};
          font-size: 22px;
          line-height: 26px;
          height: 26px;
        }
        div.DesktopOverviewContent span {
          margin-right: ${titleConfig.tag ? 20 : 0}px;
        }
      `}</style>
      <>
        <div className="DesktopOverviewContent">
          <span>{titleConfig.label}</span>
          {titleConfig.tag && (
            <FlexView flexDirection="row" style={{ gap: '5px', alignItems: 'center' }}>
              {titleConfig.error && ICONS.Error}
              <TypeTag isPrivate={titleConfig.isPrivate} tagType={titleConfig.tag} />
            </FlexView>
          )}
        </div>
        <DesktopOverviewContentSubtitle subtitleConfig={subtitleConfig} />
        {hashLabelConfig && hashLabelConfig.value}
        {info && <DesktopOverviewInfo info={info} />}
        {additionalDetails && (
          <DesktopAdditionalDetailsButton
            isAdditionalDetailsOpen={isAdditionalDetailsOpen}
            onClick={onAdditionalDetailsClick}
          />
        )}
      </>
    </>
  );
}
