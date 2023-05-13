import React, { CSSProperties, useState } from 'react';

import { LIGHT_GREY, MAIN_TABLE_PADDING } from 'data/data-style';

import { CollapseButton } from './collapse';

interface Props {
  style?: CSSProperties;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

export function Segment(props: Props) {
  const { style, title } = props;
  const [isOpen, setOpen] = useState(props.isOpen);

  return (
    <>
      <style jsx>{`
        .--block {
          position: relative;
        }
        .--block .title {
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          padding-top: 2rem;
        }
        .--block .--separator {
          position: absolute;
          left: -${MAIN_TABLE_PADDING}px;
          top: 0;
          width: calc(100% + ${MAIN_TABLE_PADDING * 2}px);
          height: 1px;
          background-color: ${LIGHT_GREY};
        }
      `}</style>
      <div style={style} className="--block">
        <div className="--separator" />
        <div className="title">
          <CollapseButton
            title={title}
            isOpen={isOpen}
            onClick={() => {
              setOpen(!isOpen);
            }}
          />
        </div>
        {isOpen && props.children}
      </div>
    </>
  );
}
