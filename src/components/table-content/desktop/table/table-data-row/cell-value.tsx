import React from 'react';

import { ValueUnitFormatter } from 'components/widgets/value-unit-formatter';
import {
  GREY,
  MOBILE_GREY_TEXT,
  MOBILE_TEXT,
  TABLET_WIDTH,
  TABLE_CELL_LINE_HEIGHT,
} from 'data/data-style';

import { ToolTipCellCopy } from './cell-tool-tip-copy';

import { ROW_HEIGHT } from './index';

interface Props {
  children: string;
  contentToCopy: string;
  unit?: string;
}

export function CellValue({ children, contentToCopy, unit }: Props) {
  return (
    <>
      <style jsx>{`
        div.CellValue {
          position: relative;
          height: ${ROW_HEIGHT - 3}px;
          width: 100%;
        }
        div.cell {
          display: flex;
          flex-direction: row;
          position: relative;
          top: 0;
          max-width: 100px;
          color: ${GREY};
          line-height: ${TABLE_CELL_LINE_HEIGHT}px;
          white-space: pre-wrap;
          font-size: 12px;
          cursor: pointer;
        }
        svg {
          position: absolute;
          width: 100%;
          height: 1px;
          bottom: 0;
          left: 0;
        }
        svg line {
          stroke: ${MOBILE_GREY_TEXT};
          stroke-width: 2px;
          stroke-dasharray: 1px 6px;
          stroke-linecap: round;
          width: 40px;
          height: 2px;
          stroke: #000;
        }
        @media (max-width: ${TABLET_WIDTH}px) {
          div.cell {
            color: ${MOBILE_TEXT};
          }
        }
      `}</style>
      <div className="CellValue">
        <ToolTipCellCopy contentToCopy={contentToCopy}>
          <div className="cell --tooltip">
            <ValueUnitFormatter unit={unit} value={children} />
          </div>
        </ToolTipCellCopy>
      </div>
    </>
  );
}
