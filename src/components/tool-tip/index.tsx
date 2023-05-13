import React, { CSSProperties } from 'react';

import {
  DESKTOP_WIDTH,
  FONT_MOBILE_FAMILY,
  TOOL_TIP_BORDER,
  TOOL_TIP_BOX_SHADOW,
  TOOL_TIP_TEXT,
} from 'data/data-style';

interface Props {
  style?: CSSProperties;
  children: string | JSX.Element;
}

export function ToolTip(props: Props) {
  const { children, style } = props;
  return (
    <>
      <style jsx>{`
        div.ToolTip {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          left: 0;
          border-radius: 2px;
          font-family: ${FONT_MOBILE_FAMILY};
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          background-color: #fff;
          white-space: nowrap;
          border: 1px solid ${TOOL_TIP_BORDER};
          box-shadow: ${TOOL_TIP_BOX_SHADOW};
          padding: 7px 12px;
          color: ${TOOL_TIP_TEXT};
          z-index: 9999;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.ToolTip {
            display: none;
          }
        }
      `}</style>
      <div style={style} className="ToolTip">
        {children}
      </div>
    </>
  );
}
