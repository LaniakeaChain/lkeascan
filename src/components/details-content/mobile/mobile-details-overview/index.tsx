import classNames from 'classnames';
import React, { useState } from 'react';

import { MOBILE_LIGHT_GREY } from 'data/data-style';
import { IOverviewContentProps } from 'models/models-details-general';

import { MobileAdditionalDetails } from './mobile-additional-details';
import { MobileOverviewContent } from './mobile-overview-content';

interface Props {
  config: IOverviewContentProps;
}

export function MobileDetailsOverview(props: Props) {
  const [isAdditionalDetailsOpen, setAdditionalDetailsOpen] = useState(false);
  const handleOpenAdditionalDetails = () => setAdditionalDetailsOpen(!isAdditionalDetailsOpen);
  return (
    <>
      <style jsx>{`
        div.MobileDetailsOverview {
          position: relative;
        }
        div.additionalDetails {
          position: relative;
          padding-top: 0;
          margin-top: 30px;
          border-top: none;
        }
        div.additionalDetails.isAdditionalDetailsOpen {
          padding-top: 24px;
          margin-top: 24px;
          border-top: 1px solid ${MOBILE_LIGHT_GREY};
        }
      `}</style>
      <div className="MobileDetailsOverview">
        <MobileOverviewContent
          {...props.config}
          isAdditionalDetailsOpen={isAdditionalDetailsOpen}
          onAdditionalDetailsClick={handleOpenAdditionalDetails}
        />
        {isAdditionalDetailsOpen && (
          <div
            className={classNames('additionalDetails', {
              isAdditionalDetailsOpen: isAdditionalDetailsOpen,
            })}
          >
            <MobileAdditionalDetails config={props.config.additionalDetails} />
          </div>
        )}
      </div>
    </>
  );
}
