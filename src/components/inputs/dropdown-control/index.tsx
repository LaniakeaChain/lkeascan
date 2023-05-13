import React, { ReactNode, useState } from 'react';

import { ICON } from 'components/svg';
import { DESKTOP_WIDTH, MOBILE_TEXT, PAGINATION_GREY } from 'data/data-style';
import { childrenWithProps } from 'utils/react';
import { useTimeout } from 'utils/use-timeout';
import { defined } from 'utils/variable-evaluation';

interface Props {
  isChevron?: boolean;
  label: string;
  value?: string;
  children: ReactNode;
}

export function DropdownControl(props: Props) {
  const { children, isChevron, label, value } = props;
  const [isOpen, setOpen] = useState(false);
  const isValue = defined(value);

  const [openTimeout] = useTimeout(0);

  return (
    <>
      <style jsx>{`
        button.DropdownControl {
          display: flex;
          align-items: center;
          flex-direction: row;
        }
        span.label {
          color: ${isChevron ? (isValue ? PAGINATION_GREY : MOBILE_TEXT) : PAGINATION_GREY};
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          border: none;
          background-color: transparent;
          white-space: nowrap;
          margin-right: ${isChevron ? 8 : 6}px;
        }
        span.value {
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          border: none;
          background-color: transparent;
          width: 100%;
          white-space: nowrap;
          margin-right: 8px;
        }
        div.icon {
          display: inline-block;
          transition: 200ms transform;
          transform: rotate(${isOpen ? 180 : 0}deg);
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.label {
            line-height: 16px;
            margin-right: 5px;
          }
        }
      `}</style>
      <button
        className="DropdownControl"
        onClick={(e) => {
          openTimeout(() => setOpen(!isOpen));

          // delay so that window click is triggered first
          if (isOpen) {
            e.stopPropagation();
          }
        }}
      >
        <span className="label">{`${label}${isValue ? ':' : ''}`}</span>
        {isValue && <span className="value">{value}</span>}
        {isChevron ? (
          <div className="icon">{ICON.ChevronDown}</div>
        ) : (
          <div className="icon">{ICON.CaretUp}</div>
        )}
      </button>
      {isOpen && childrenWithProps(children, { onClose: () => setOpen(false) })}
    </>
  );
}
