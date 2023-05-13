import React from 'react';

import { ICON } from 'components/svg';

function DropdownArrow(props: { isOpen: boolean }) {
  return (
    <>
      <style jsx>{`
        span.AdditionalDetailsDropdownArrow {
          transform: rotate(${props.isOpen ? 180 : 0}deg);
          transition: 200ms transform;
        }
      `}</style>
      <span className="AdditionalDetailsDropdownArrow">{ICON.ChevronDown}</span>
    </>
  );
}

interface Props {
  title: string;
  isOpen: boolean;
  onClick();
}

export function CollapseButton({ isOpen, onClick, title }: Props) {
  return (
    <>
      <style jsx>{`
        button.CollapseButton {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;
        }
        h3 {
          margin-right: 0.5rem;
        }
      `}</style>
      <button onClick={onClick} className="CollapseButton">
        <h3>{title}</h3>
        <DropdownArrow isOpen={isOpen} />
      </button>
    </>
  );
}
