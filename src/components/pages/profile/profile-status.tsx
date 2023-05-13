import React from 'react';

import { LoadingSpinner } from 'components/placeholders/loading-spinner';
import { INDICATOR_COLOR_LOOKUP } from 'data/data-profile';
import { HI_BLUE, MOBILE_GREY_TEXT, MOBILE_TEXT } from 'data/data-style';
import { ESyncStatus } from 'models/models-data-general';
import { defined } from 'utils/variable-evaluation';

interface Props {
  status: ESyncStatus;
}

export function ProfileStatus(props: Props) {
  const { status } = props;
  return (
    <>
      <style jsx>{`
        div.ProfileStatus {
          margin-top: 24px;
          width: 100%;
        }
        div.line-status {
          width: 100%;
          height: 2px;
          background-color: ${INDICATOR_COLOR_LOOKUP[ESyncStatus[status]] || HI_BLUE};
        }
        div.status-info {
          display: flex;
          flex-direction: row;
          width: 100%;
          padding-top: 12px;
          font-size: 14px;
          line-height: 16px;
          white-space: pre-wrap;
        }
        div.status-info span:first-child {
          color: ${MOBILE_GREY_TEXT};
        }
        div.status-info span:last-child {
          color: ${MOBILE_TEXT};
        }
      `}</style>
      <div className="ProfileStatus">
        <div className="line-status" />
        <div className="status-info">
          {defined(status) ? (
            <>
              <span>{`Status: `}</span>
              <span>{ESyncStatus[status]}</span>
            </>
          ) : (
            <>
              <LoadingSpinner style={{ width: 16, height: 16, marginRight: 12 }} />
              <span>Loading...</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
