import React from 'react';

import { DropdownControl } from 'components/inputs/dropdown-control';
import { DropdownContentBasic } from 'components/inputs/dropdown-control/dropdown-content-basic';
import { DropdownWrapper } from 'components/inputs/dropdown-control/dropdown-wrapper';
import { DESKTOP_WIDTH } from 'data/data-style';
import { IDropdownOption } from 'models/models-inputs';

interface Props {
  value: number;
  onChange(selectedOption: IDropdownOption): void;
}

export function RowsSelecter({ onChange, value }: Props) {
  return (
    <>
      <style jsx>{`
        div.RowsSelecter {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: inherit;
          font-size: 14px;
          line-height: 22px;
        }
        div.text {
          margin-right: 12px;
          font-weight: inherit;
          white-space: nowrap;
        }
        div.dropdown-wrapper {
          position: relative;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          margin-right: 29px;
          height: 22px;
          cursor: pointer;
          z-index: 2;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.RowsSelecter {
            line-height: 16px;
          }
          span.text {
            margin-right: 12px;
          }
          div.dropdown-wrapper {
            height: 16px;
          }
        }
      `}</style>
      <div className="RowsSelecter">
        <div className="text">Rows per page:</div>
        <div className="dropdown-wrapper">
          <DropdownControl label={value.toString()}>
            <DropdownWrapper>
              <DropdownContentBasic
                style={{
                  bottom: '100%',
                  top: 'auto',
                  right: 0,
                  left: 'auto',
                }}
                onChange={onChange}
              >
                {['10', '25', '50']}
              </DropdownContentBasic>
            </DropdownWrapper>
          </DropdownControl>
        </div>
      </div>
    </>
  );
}
