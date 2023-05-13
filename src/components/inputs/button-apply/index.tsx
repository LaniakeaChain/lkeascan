import React from 'react';

import { HEADER_ICON_PURPLE } from 'data/data-style';

interface Props {
  isNEW?: boolean;
  isDesktop?: boolean;
  onClick(): void;
}

export function ButtonApply(props: Props) {
  const { isDesktop, onClick } = props;
  return (
    <>
      <style jsx>{`
        button.TableApplyButton {
          margin-top: ${isDesktop ? 12 : 18}px;
          padding: ${isDesktop ? 8 : 12}px 0;
          width: 100%;
          border-radius: 4px;
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
          box-shadow: none;
          text-align: center;
        }
        button.apply:active {
          background-color: ${HEADER_ICON_PURPLE};
        }
      `}</style>
      <button className="TableApplyButton --blue-square" onClick={onClick}>
        Apply
      </button>
    </>
  );
}
