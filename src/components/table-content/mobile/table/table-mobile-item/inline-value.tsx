import React, { CSSProperties } from 'react';

import { ToolTipCopyButton } from 'components/tool-tip/tool-tip-content-inline/tool-tip-copy-button';
import { ToolTipInline } from 'components/tool-tip/tool-tip-inline';
import { ValueUnitFormatter } from 'components/widgets/value-unit-formatter';

interface IInlineValueProps {
  style?: CSSProperties;
  contentToCopy: string;
  children: string;
  unit?: string;
}

export function InlineValue({ children, contentToCopy, style, unit }: IInlineValueProps) {
  return (
    <>
      <style jsx>{`
        div.content {
          display: flex;
          flex-direction: row;
          position: relative;
          white-space: pre-wrap;
          cursor: pointer;
        }
      `}</style>
      <ToolTipInline
        style={style}
        toolTipContent={<ToolTipCopyButton contentToCopy={contentToCopy} />}
      >
        <div className="content">
          <ValueUnitFormatter unit={unit} value={children} />
        </div>
      </ToolTipInline>
    </>
  );
}
