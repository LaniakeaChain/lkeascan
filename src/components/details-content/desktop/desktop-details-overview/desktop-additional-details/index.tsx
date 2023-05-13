import React from 'react';

import { DARK_PURPLE_TEXT_2, LIGHT_GREY_TEXT } from 'data/data-style';
import { INameElementValue } from 'models/models-general';
import { defined } from 'utils/variable-evaluation';

interface Props {
  config: INameElementValue[][];
}

export function DesktopAdditionalDetails(props: Props) {
  return (
    <>
      <style jsx>{`
        div.DesktopAdditionalDetails {
        }
        ul.row {
          list-style: none;
        }
        li.pair {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
        }
        li.pairRow {
          display: flex;
        }
        div {
          position: relative;
          font-size: 12px;
          line-height: 32px;
        }
        div.name {
          margin-right: 12px;
          color: ${LIGHT_GREY_TEXT};
        }
        div.value {
          margin-right: 24px;
          color: ${DARK_PURPLE_TEXT_2};
        }
      `}</style>
      <div className="DesktopAdditionalDetails">
        {props.config.map((row: INameElementValue[], i: number) => (
          <ul key={`row-${i}`} className="row">
            {row
              .filter((item) => defined(item))
              .map((item: INameElementValue) => (
                <li key={item.name} className="pair">
                  <div className="name">{item.name}:</div>
                  <div className="value">{item.value}</div>
                </li>
              ))}
          </ul>
        ))}
      </div>
    </>
  );
}
