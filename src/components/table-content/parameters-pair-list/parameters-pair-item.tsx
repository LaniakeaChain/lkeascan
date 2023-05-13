import classNames from 'classnames';
import React from 'react';

import { ToolTipCopyButton } from 'components/tool-tip/tool-tip-content-inline/tool-tip-copy-button';
import { ToolTipInline } from 'components/tool-tip/tool-tip-inline';
import {
  DESKTOP_WIDTH,
  GREY,
  LIGHT_GREY_TEXT,
  MOBILE_TEXT_NAME,
  MOBILE_TEXT_VALUE,
  TABLE_CELL_LINE_HEIGHT,
} from 'data/data-style';
import { capitalize } from 'utils/format';

interface Props {
  fullValue?: string;
  isFunctionMeta?: boolean;
  name: string;
  value: string | JSX.Element;
}

export function ParametersPairItem({ fullValue, isFunctionMeta, name, value }: Props) {
  return (
    <>
      <style jsx>{`
        li.ParametersPairItem {
          position: relative;
          display: flex;
          height: 22px;
          margin-top: 0px;
          z-index: 1;
        }
        li.ParametersPairItem.isFunctionMeta {
          height: 12px;
          margin-top: 4px;
        }
        li.ParametersPairItem:first-child {
          margin-top: 0;
        }
        li.ParametersPairItem.isFunctionMeta div {
          font-size: 10px;
          line-height: 12px;
          height: 12px;
        }
        div {
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          line-height: ${TABLE_CELL_LINE_HEIGHT}px;
          height: ${TABLE_CELL_LINE_HEIGHT}px;
          white-space: pre-wrap;
        }
        div.name {
          color: ${LIGHT_GREY_TEXT};
        }
        div.value {
          position: relative;
          color: ${GREY};
          width: auto;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          li.ParametersPairItem {
            height: 16px;
            margin-top: 8px;
          }
          li.ParametersPairItem:first-child {
            margin-top: 0;
          }
          div {
            font-size: 12px;
            line-height: 16px;
            height: 16px;
          }
          div.name {
            color: ${MOBILE_TEXT_NAME};
          }
          div.value {
            color: ${MOBILE_TEXT_VALUE};
          }
        }
      `}</style>
      <li className={classNames('ParametersPairItem', { isFunctionMeta })}>
        {name && <div className="name">{capitalize(name)}: </div>}
        <ToolTipInline toolTipContent={<ToolTipCopyButton contentToCopy={fullValue} />}>
          <div className="value">{value}</div>
        </ToolTipInline>
      </li>
    </>
  );
}
