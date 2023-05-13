import React, { CSSProperties } from 'react';

import { TextLink } from 'components/table-content/desktop/table/table-data-row/text-link';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { ToolTipCopyButton } from 'components/tool-tip/tool-tip-content-inline/tool-tip-copy-button';
import { ToolTipInline } from 'components/tool-tip/tool-tip-inline';
import { ILinkConfig } from 'models/models-data-general';

import { InlineContractIcon } from './inline-contract-icon';

interface IInlineHashProps {
  children: string;
  contentToCopy: string;
  isContract?: boolean;
  linkConfig?: ILinkConfig;
  style?: CSSProperties;
}

export function InlineHash({
  children,
  contentToCopy,
  isContract,
  linkConfig,
  style,
}: IInlineHashProps) {
  return (
    <>
      <style jsx>{`
        div.InlineHash {
          display: flex;
          position: relative;
        }
      `}</style>
      <div className="InlineHash">
        {isContract && (
          <div style={{ marginRight: 4 }}>
            <InlineContractIcon />
          </div>
        )}
        <ToolTipInline
          style={style}
          toolTipContent={<ToolTipCopyButton contentToCopy={contentToCopy} />}
        >
          {linkConfig ? (
            <TextLink
              style={{
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }}
              {...linkConfig}
            >
              {children}
            </TextLink>
          ) : (
            <TextOnly
              style={{
                fontSize: 'inherit',
                lineHeight: 'inherit',
              }}
            >
              {children}
            </TextOnly>
          )}
        </ToolTipInline>
      </div>
    </>
  );
}
