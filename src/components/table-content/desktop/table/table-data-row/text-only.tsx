import classNames from 'classnames';
import React, { CSSProperties } from 'react';

import { TextTruncate } from 'components/text-truncate';
import { GREY, TABLE_CELL_LINE_HEIGHT } from 'data/data-style';

interface Props {
  children: string | JSX.Element;
  isToolTip?: boolean;
  style?: CSSProperties;
}

export function TextOnly({ children, isToolTip, style }: Props) {
  return (
    <>
      <style jsx>{`
        div.TextOnly {
          color: ${GREY};
          font-size: 12px;
          line-height: ${TABLE_CELL_LINE_HEIGHT}px;
        }
        span {
          height: inherit;
          line-height: inherit;
        }
      `}</style>
      <div style={style} className="TextOnly">
        <TextTruncate isToolTipDisabled={!isToolTip}>
          <span className={classNames({ '--tooltip': isToolTip })}>{children}</span>
        </TextTruncate>
      </div>
    </>
  );
}
