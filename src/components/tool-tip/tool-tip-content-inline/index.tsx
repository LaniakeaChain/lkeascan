import React, { CSSProperties } from 'react';

import { TextLink } from 'components/table-content/desktop/table/table-data-row/text-link';
import { ILinkConfig } from 'models/models-data-general';

import { ToolTipInline } from '../tool-tip-inline';

import { ToolTipCopyButton } from './tool-tip-copy-button';

interface Props {
  style?: CSSProperties;
  textStyle?: CSSProperties;
  contentToCopy: string;
  children: string | JSX.Element;
  linkConfig?: ILinkConfig;
}

export function ToolTipContentInline(props: Props) {
  const { children, contentToCopy, linkConfig, style, textStyle } = props;

  return (
    <ToolTipInline
      style={style}
      toolTipContent={<ToolTipCopyButton contentToCopy={contentToCopy} />}
    >
      {linkConfig ? (
        <TextLink style={{ ...textStyle, width: 'auto' }} href={linkConfig.href} as={linkConfig.as}>
          {children}
        </TextLink>
      ) : (
        <div style={{ ...textStyle, cursor: 'pointer', width: '100%' }}>{children}</div>
      )}
    </ToolTipInline>
  );
}
