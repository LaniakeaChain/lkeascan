import React from 'react';

import { ICON } from 'components/svg';
import { TextTruncate } from 'components/text-truncate';
import { WHITE } from 'data/data-style';
import { defined } from 'utils/variable-evaluation';

interface Props {
  name: string;
  isOpen: boolean;
  onClick(): void;
}

export function AccountInfoControl(props: Props) {
  const { isOpen, name, onClick } = props;

  return (
    <>
      <style jsx>{`
        button.control {
          display: flex;
          align-items: center;
          flex-direction: row;
          color: ${WHITE};
        }
        div.name {
          font-size: 14px;
          line-height: 19px;
          margin-right: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        div.icon :global(svg.ARROWS--ChevronDown) {
          width: 12px;
          height: 12px;
          transform: rotate(${isOpen ? 180 : 0}deg);
          transition: transform 200ms;
        }
      `}</style>
      <button className="control" onClick={onClick}>
        {defined(name) && (
          <div className="name">
            <TextTruncate>{name}</TextTruncate>
          </div>
        )}
        <div className="icon">{ICON.ChevronDown}</div>
      </button>
    </>
  );
}
