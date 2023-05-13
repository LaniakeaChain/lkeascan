import React from 'react';

import { DetailsHighlightValue } from 'components/details-content/common/details-highlight-value';
import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { CARD_PURPLE, LIGHT_PURPLE_TEXT, WHITE } from 'data/data-style';
import { IDetailsHighlightProps } from 'models/models-details-general';

export function MobileDetailsHighlight(props: IDetailsHighlightProps) {
  const { title, tooltipContentToCopy, unit, value } = props;
  return (
    <>
      <style jsx>{`
        div.MobileDetailsHighlight {
          position: relative;
          margin-top: 30px;
          background-color: ${CARD_PURPLE};
          padding: 20px;
        }
        div.title {
          color: ${WHITE};
          font-size: 12px;
          line-height: 16px;
        }
        div.line {
          height: 2px;
          width: 100%;
          margin: 24px 0 4px;
          background-color: ${LIGHT_PURPLE_TEXT};
        }
      `}</style>
      <div className="MobileDetailsHighlight">
        <div className="title">{title}</div>
        {tooltipContentToCopy ? (
          <ToolTipContentInline
            style={{ display: 'inline', width: '100%' }}
            textStyle={{ fontSize: 14, marginTop: 20 }}
            contentToCopy={tooltipContentToCopy}
          >
            <DetailsHighlightValue
              tooltipContentToCopy={tooltipContentToCopy}
              value={value}
              unit={unit}
            />
          </ToolTipContentInline>
        ) : (
          <DetailsHighlightValue value={value} unit={unit} />
        )}
        <div className="line" />
      </div>
    </>
  );
}
