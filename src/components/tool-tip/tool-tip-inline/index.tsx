import React, { CSSProperties, useState } from 'react';

import { TOOLTIP_ENTER_DELAY } from 'data/data-style';
import { useTimeout } from 'utils/use-timeout';

interface Props {
  style?: CSSProperties;
  toolTipStyle?: CSSProperties;
  toolTipContent: string | JSX.Element;
  children: string | JSX.Element;
}

export function ToolTipInline(props: Props) {
  const [isHovering, setHovering] = useState(false);
  const [hoveringTimeout, clearHoveringTimeout] = useTimeout(TOOLTIP_ENTER_DELAY);
  const { children, style, toolTipContent, toolTipStyle } = props;

  return (
    <>
      <style jsx>{`
        div.ToolTipInline {
          display: block;
          position: relative;
          height: 100%;
          z-index: ${isHovering ? 1 : 0};
        }
        div.tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
        div.empty-padding {
          width: 100%;
          height: 7px;
        }
      `}</style>
      <div
        style={style}
        className="ToolTipInline"
        onMouseEnter={() => {
          hoveringTimeout(() => setHovering(true));
        }}
        onMouseLeave={() => {
          clearHoveringTimeout();
          setHovering(false);
        }}
      >
        {children}
        {isHovering && (
          <div className="tooltip" style={toolTipStyle}>
            {toolTipContent}
            <div className="empty-padding" />
          </div>
        )}
      </div>
    </>
  );
}
