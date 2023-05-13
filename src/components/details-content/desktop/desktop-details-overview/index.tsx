import React, { useState } from 'react';

import { CardView } from 'components/card-view';
import { LIGHT_GREY, MAIN_TABLE_PADDING } from 'data/data-style';
import { IOverviewContentProps } from 'models/models-details-general';

import { CARD_GAP } from '..';

import { DesktopAdditionalDetails } from './desktop-additional-details';
import { DesktopOverviewContent } from './desktop-overview-content';

interface Props {
  isHighlight: boolean;
  config: IOverviewContentProps;
}

export function DesktopDetailsOverview(props: Props) {
  const [isAdditionalDetailsOpen, setAdditionalDetailsOpen] = useState(false);
  const handleOpenAdditionalDetails = () => setAdditionalDetailsOpen(!isAdditionalDetailsOpen);
  const width = props.isHighlight ? `calc(60% - ${CARD_GAP * 0.5}px)` : '100%';
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsOverview {
          width: ${width};
          display: flex;
          flex-direction: column;
        }
        div.additionalDetails {
          position: relative;
          padding-top: ${MAIN_TABLE_PADDING}px;
          margin-top: ${MAIN_TABLE_PADDING}px;
        }
        div.line {
          position: absolute;
          left: -${MAIN_TABLE_PADDING}px;
          top: 0;
          width: calc(100% + ${MAIN_TABLE_PADDING * 2}px);
          height: 1px;
          background-color: ${LIGHT_GREY};
        }
      `}</style>
      <div className="DesktopDetailsOverview">
        <CardView>
          <DesktopOverviewContent
            {...props.config}
            isAdditionalDetailsOpen={isAdditionalDetailsOpen}
            onAdditionalDetailsClick={handleOpenAdditionalDetails}
          />
          {isAdditionalDetailsOpen && (
            <div className="additionalDetails">
              <div className="line" />
              <DesktopAdditionalDetails config={props.config.additionalDetails} />
            </div>
          )}
        </CardView>
      </div>
    </>
  );
}
