import React from 'react';

import { ICON } from 'components/svg';

interface Props {
  isOpen: boolean;
}

export function AdditionalDetailsDropdownArrow(props: Props) {
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
