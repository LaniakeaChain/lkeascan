import React from 'react';

import { TextTruncate } from 'components/text-truncate';
import { ToolTip } from 'components/tool-tip';
import { ToolTipInline } from 'components/tool-tip/tool-tip-inline';
import {
  formatDateDiffFromNow,
  formatIsoToDayYearMonth,
  formatIsoToHoursMinutesSeconds,
} from 'utils/format';

interface IInlineTimeProps {
  children: string;
}

export function InlineTime({ children }: IInlineTimeProps) {
  return (
    <>
      <style jsx>{`
        div.InlineTime {
          position: relative;
          cursor: pointer;
        }
      `}</style>
      <div className="InlineTime">
        <ToolTipInline
          toolTipContent={
            <ToolTip>
              <>
                <span>{formatIsoToDayYearMonth(children)}</span>
                <span>{formatIsoToHoursMinutesSeconds(children)}</span>
              </>
            </ToolTip>
          }
        >
          <TextTruncate>{formatDateDiffFromNow(children)}</TextTruncate>
        </ToolTipInline>
      </div>
    </>
  );
}
