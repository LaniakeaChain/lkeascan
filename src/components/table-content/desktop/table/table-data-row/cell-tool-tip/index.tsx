import React, { CSSProperties, useState } from 'react';

import { TABLE_CELL_LINE_HEIGHT, TOOLTIP_ENTER_DELAY } from 'data/data-style';
import { useTimeout } from 'utils/use-timeout';

interface Props {
  children: string | JSX.Element;
  style?: CSSProperties;
  toolTipContent: JSX.Element;
}

export function ToolTipCell({ children, style, toolTipContent }: Props) {
  const [isHovering, setHovering] = useState(false);
  const [hoveringTimeout, clearHoveringTimeout] = useTimeout(TOOLTIP_ENTER_DELAY);

  return (
    <>
      <style jsx>{`
        div.ToolTipCell {
          display: flex;
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-${TABLE_CELL_LINE_HEIGHT * 0.5}px);
          z-index: ${isHovering ? 2 : 0};
        }
        div.children {
          display: flex;
          min-height: 0;
          flex-direction: column-reverse;
          position: relative;
          min-width: 0;
          left: 0;
        }
        div.toolTipContent {
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%);
        }
        div.empty-padding {
          width: 100%;
          height: 7px;
        }
      `}</style>
      <div
        style={style}
        className="ToolTipCell"
        onMouseEnter={() => {
          hoveringTimeout(() => setHovering(true));
        }}
        onMouseLeave={() => {
          clearHoveringTimeout();
          setHovering(false);
        }}
      >
        <div className="children">
          {children}
          {isHovering && (
            <div className="toolTipContent" style={{ flexShrink: 1 }}>
              {toolTipContent}
              <div className="empty-padding" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
