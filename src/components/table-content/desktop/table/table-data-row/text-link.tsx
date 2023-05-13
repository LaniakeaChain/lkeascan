import Link from 'next/link';
import React, { CSSProperties } from 'react';

import { TextTruncate } from 'components/text-truncate';
import { TABLE_CELL_LINE_HEIGHT } from 'data/data-style';
import { ILinkConfig } from 'models/models-data-general';

interface Props extends ILinkConfig {
  children: string | JSX.Element;
  style?: CSSProperties;
}

export function TextLink({ children, style, ...remainingProps }: Props) {
  return (
    <>
      <style jsx>{`
        a.TextLink {
          display: block;
          position: relative;
          font-size: 12px;
          line-height: ${TABLE_CELL_LINE_HEIGHT}px;
          max-width: 100%;
          cursor: pointer;
        }
      `}</style>
      <Link {...remainingProps}>
        <a style={style} className="TextLink --text-link">
          <TextTruncate isToolTipDisabled>
            <span className="--tooltip">{children}</span>
          </TextTruncate>
        </a>
      </Link>
    </>
  );
}
