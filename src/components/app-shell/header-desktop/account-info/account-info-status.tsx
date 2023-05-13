import React from 'react';

import { INDICATOR_COLOR_LOOKUP } from 'data/data-profile';
import { HI_BLUE, MOBILE_GREY_TEXT, MOBILE_TEXT, WHITE } from 'data/data-style';
import { ESyncStatus } from 'models/models-data-general';
import { defined } from 'utils/variable-evaluation';

interface Props {
  status: ESyncStatus;
  latestBlock: string;
  latestIndexedBlock: string;
}

export function AccountInfoStatus(props: Props) {
  const { latestBlock, latestIndexedBlock, status } = props;

  const syncPct =
    latestBlock && latestIndexedBlock
      ? (Number(latestIndexedBlock) / Number(latestBlock)) * 100
      : 0;

  return (
    <>
      <style jsx>{`
        div.AccountInfoStatus {
          width: 100%;
        }
        div.line {
          padding: 2px 0;
          background-color: ${INDICATOR_COLOR_LOOKUP[ESyncStatus[status]] || HI_BLUE};
          font-size: 10px;
          font-weight: bold;
          color: ${WHITE};
        }
        div.progress-border {
          width: 100%;
          background-color: ${MOBILE_GREY_TEXT};
          text-align: center;
        }
        div.status-info {
          width: 100%;
          padding-top: 12px;
          font-size: 12px;
          line-height: 16px;
        }
        div.status-info span:first-child {
          color: ${MOBILE_GREY_TEXT};
        }
        div.status-info span:last-child {
          color: ${MOBILE_TEXT};
        }
        .status-info-header {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .status-info-body.title {
          margin-top: 15px;
          font-weight: 600;
          text-align: left;
          padding-left: 10px;
          font-size: 12px;
        }
        .status-info-body.blocks {
          font-weight: 400;
          margin-bottom: 10px;
          text-align: left;
          padding-left: 10px;
          font-size: 12px;
        }
      `}</style>
      <div className="AccountInfoStatus">
        {defined(status) ? (
          <div className="status-info">
            <div className="status-info-header">
              <span>{ESyncStatus[status]}</span>
            </div>
            <span>{Math.trunc(syncPct)}%</span>
            <div className="progress-border">
              <div
                className="line"
                style={{
                  width: `${Math.trunc(syncPct)}%`,
                }}
              ></div>
            </div>
            {defined(latestBlock) && (
              <>
                <div className="status-info-body title">
                  <span>Latest Block</span>
                </div>
                <div className="status-info-body blocks">
                  <span>{latestBlock.toLocaleString()}</span>
                </div>
              </>
            )}
            {defined(latestIndexedBlock) && (
              <>
                <div className="status-info-body title">
                  <span>Latest Indexed Block</span>
                </div>
                <div className="status-info-body blocks">
                  <span>{latestIndexedBlock.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="status-info">
            <span>Loading Status...</span>
          </div>
        )}
      </div>
    </>
  );
}
