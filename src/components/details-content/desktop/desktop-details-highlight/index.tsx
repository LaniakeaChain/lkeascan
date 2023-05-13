import React from 'react';

import { CardView } from 'components/card-view';
import { DetailsHighlightValue } from 'components/details-content/common/details-highlight-value';
import { MAIN_TABLE_PADDING, WHITE } from 'data/data-style';
import { IDetailsHighlightProps } from 'models/models-details-general';
import { themed } from 'theming';

import { CARD_GAP } from '..';

export function DesktopDetailsHighlight(props: IDetailsHighlightProps) {
  const { style, title, tooltipContentToCopy, unit, value } = props;
  const palette = themed('palette');
  return (
    <>
      <style jsx>{`
        div.DesktopDetailsHighlight {
          width: calc(40% - ${CARD_GAP * 0.5}px);
        }
        div.title {
          color: ${WHITE};
          font-size: 22px;
          line-height: 26px;
        }
        div.line {
          height: 2px;
          width: auto;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 1.5rem;
          bottom: 1rem;
          background-color: ${WHITE};
          opacity: 0.2;
        }
        .overview-entry {
          display: flex;
          align-items: 'center';
          margin-bottom: 1rem;
        }
      `}</style>
      <div className="DesktopDetailsHighlight">
        <CardView
          style={{
            backgroundColor: palette.header.background,
            height: `calc(100% - ${MAIN_TABLE_PADDING * 2}px)`,
            ...style,
          }}
        >
          <div className="title">{title}</div>
          <DetailsHighlightValue
            tooltipContentToCopy={tooltipContentToCopy}
            value={value}
            unit={unit}
          />
          {/* <div className="text">
            <div className="overview-entry">
              <span className="overview-title">Holders</span>
              <span className="overview-text">150,000</span>
            </div>
            <div className="overview-entry">
              <span className="overview-title">Transfers</span>
              <span className="overview-text">1,000,021</span>
            </div>
          </div> */}
          <div className="line" />
        </CardView>
      </div>
    </>
  );
}
