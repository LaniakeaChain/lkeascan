import React from 'react';

import { ICON } from 'components/svg';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { MOBILE_TEXT } from 'data/data-style';

interface Props {
  children: string;
  onDeleteClick(): void;
}

export function DropZoneFileListItem(props: Props) {
  const { children, onDeleteClick } = props;
  return (
    <>
      <style jsx>{`
        li {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          color: ${MOBILE_TEXT};
          margin-top: 4px;
        }
        li:first-child {
          margin-top: 0;
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }
      `}</style>
      <li>
        <span>{children}</span>
        <InteractiveButton style={{ width: 20, height: 20 }} onClick={onDeleteClick}>
          {ICON.SmallCross}
        </InteractiveButton>
      </li>
    </>
  );
}
