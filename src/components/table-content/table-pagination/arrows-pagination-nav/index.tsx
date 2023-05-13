import React from 'react';

import { ICON } from 'components/svg';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { DESKTOP_WIDTH, GREY } from 'data/data-style';

interface Props {
  currentPage: number;
  onPageNumberChange(page: number): void;
  totalPages: number;
}

export function ArrowsPaginationNav({ currentPage, onPageNumberChange, totalPages }: Props) {
  const min = 0;
  const max = totalPages - 1;
  const buttonStyle = { width: 32, height: 32 };

  return (
    <>
      <style jsx>{`
        nav.ArrowsPaginationNav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          height: 44px;
          color: ${GREY};
        }
        div.group {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          nav.ArrowsPaginationNav {
            height: 16px;
          }
        }
      `}</style>
      <nav className="ArrowsPaginationNav">
        <div className="group">
          <InteractiveButton
            style={buttonStyle}
            isDisabled={currentPage === min}
            onClick={() => onPageNumberChange(min)}
          >
            {ICON.ChevronLeftEnd}
          </InteractiveButton>
          <InteractiveButton
            style={buttonStyle}
            isDisabled={currentPage === min}
            onClick={() => onPageNumberChange(Math.max(min, currentPage - 1))}
          >
            {ICON.ChevronLeft}
          </InteractiveButton>
        </div>
        <div className="group">
          <InteractiveButton
            style={buttonStyle}
            isDisabled={currentPage === max}
            onClick={() => onPageNumberChange(Math.min(max, currentPage + 1))}
          >
            {ICON.ChevronRight}
          </InteractiveButton>
          <InteractiveButton
            style={buttonStyle}
            isDisabled={currentPage === max}
            onClick={() => onPageNumberChange(max)}
          >
            {ICON.ChevronRightEnd}
          </InteractiveButton>
        </div>
      </nav>
    </>
  );
}
