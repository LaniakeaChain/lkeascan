import React from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { ValueUnitFormatter } from 'components/widgets/value-unit-formatter';
import { DESKTOP_WIDTH, FONT_WEIGHT_LIGHT, WHITE } from 'data/data-style';
import { defined } from 'utils/variable-evaluation';

interface Props {
  value: string;
  unit?: string;
  tooltipContentToCopy?: string;
  symbol?: string;
}

export function DetailsHighlightValue(props: Props) {
  const { tooltipContentToCopy, unit, value } = props;
  const isToolTip = defined(tooltipContentToCopy);
  return (
    <>
      <style jsx>{`
        div.DetailsHighlightValue {
          position: relative;
          margin-top: 24px;
          width: 100%;
        }
        div.text {
          display: inline-flex;
          flex-direction: row;
          white-space: pre-wrap;
          color: ${WHITE};
          font-size: 62px;
          line-height: 74px;
          font-weight: ${FONT_WEIGHT_LIGHT};
          width: 100%;
          cursor: ${isToolTip ? 'pointer' : 'default'};
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.DetailsHighlightValue {
            margin-top: 20px;
          }
          div.text {
            font-size: 24px;
            line-height: 28px;
          }
        }
      `}</style>
      <div className="DetailsHighlightValue">
        {isToolTip ? (
          <ToolTipContentInline
            style={{ display: 'inline-block', width: '100%' }}
            textStyle={{ fontSize: 14 }}
            contentToCopy={tooltipContentToCopy}
          >
            <div className="text">
              <ValueUnitFormatter value={value} unit={unit} />
            </div>
          </ToolTipContentInline>
        ) : (
          <div className="text">
            <ValueUnitFormatter value={value} unit={unit} />
          </div>
        )}
      </div>
    </>
  );
}
