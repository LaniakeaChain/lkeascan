import React from 'react';

import { ToolTip } from 'components/tool-tip';
import { TABLE_CELL_LINE_HEIGHT, TEXT_GREY } from 'data/data-style';
import {
  formatDateDiffFromNow,
  formatIsoToDayYearMonth,
  formatIsoToHoursMinutesSeconds,
} from 'utils/format';

import { ToolTipCell } from './cell-tool-tip';

import { ROW_HEIGHT } from './index';

interface Props {
  children: string;
}

export function CellTime({ children }: Props) {
  return (
    <>
      <style jsx>{`
        div.CellTime {
          position: relative;
          height: ${ROW_HEIGHT - 3}px;
          width: 100%;
        }
        span.time {
          font-size: 12px;
          line-height: ${TABLE_CELL_LINE_HEIGHT}px;
          color: ${TEXT_GREY};
          cursor: pointer;
        }
      `}</style>
      <div className="CellTime">
        <ToolTipCell
          toolTipContent={
            <ToolTip
              style={{
                marginTop: 12,
                flexDirection: 'column',
              }}
            >
              <>
                <span>{formatIsoToDayYearMonth(children)}</span>
                <span>{formatIsoToHoursMinutesSeconds(children)}</span>
              </>
            </ToolTip>
          }
        >
          <span className="time --tooltip">{formatDateDiffFromNow(children)}</span>
        </ToolTipCell>
      </div>
    </>
  );
}
