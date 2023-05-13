import React from 'react';

import { ICON } from 'components/svg';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { MOBILE_TEXT } from 'data/data-style';

interface Props {
  onClick(): void;
}

export function TableMobileModalCross({ onClick }: Props) {
  return (
    <>
      <style jsx>{`
        button.cross {
          position: absolute;
          top: -3px;
          right: 0;
          width: 24px;
          height: 24px;
          color: ${MOBILE_TEXT};
          cursor: pointer;
        }
      `}</style>
      <button className="cross" onClick={onClick}>
        <InteractiveButton style={{ width: 34, height: 34, borderRadius: 17 }}>
          {ICON.Cross}
        </InteractiveButton>
      </button>
    </>
  );
}
