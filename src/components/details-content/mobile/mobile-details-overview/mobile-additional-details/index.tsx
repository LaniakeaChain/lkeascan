import React from 'react';

import { BOTTOM_MENU_GREY } from 'data/data-style';
import { INameElementValue } from 'models/models-general';
import { flatten } from 'utils/array';
import { defined } from 'utils/variable-evaluation';

interface Props {
  config: INameElementValue[][];
}

export function MobileAdditionalDetails(props: Props) {
  const flatConfig = flatten(props.config);
  return (
    <>
      <style jsx>{`
        ul.MobileAdditionalDetails {
          list-style: none;
        }
        li.pair {
          display: flex;
          flex-direction: row;
          align-items: center;
          white-space: pre-wrap;
          margin-top: 8px;
          height: 16px;
        }
        li.pair:first-child {
          margin-top: 0;
        }
        div {
          position: relative;
          font-size: 12px;
          line-height: 16px;
        }
        div.name {
          color: ${BOTTOM_MENU_GREY};
        }
      `}</style>
      <ul className="MobileAdditionalDetails">
        {flatConfig
          .filter((item) => defined(item))
          .map((item: INameElementValue) => (
            <li key={item.name} className="pair">
              <div className="name">{item.name}:</div>
              <span> </span>
              <div className="value">{item.value}</div>
            </li>
          ))}
      </ul>
    </>
  );
}
