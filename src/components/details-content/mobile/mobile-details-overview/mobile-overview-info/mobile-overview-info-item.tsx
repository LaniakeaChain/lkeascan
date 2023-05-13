import React, { CSSProperties } from 'react';

import { BOTTOM_MENU_GREY } from 'data/data-style';
import { INameElementValue } from 'models/models-general';

interface Props extends INameElementValue {
  style: CSSProperties;
  valueStyle: CSSProperties;
}

export function MobileOverviewInfoItem(props: Props) {
  const { name, style, value, valueStyle } = props;

  return (
    <>
      <style jsx>{`
        li.MobileOverviewInfoItem {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          white-space: pre-wrap;
          margin-top: 8px;
        }
        li.MobileOverviewInfoItem:first-child {
          margin-top: 0;
        }
        div {
          position: relative;
          top: 0;
          font-size: 14px;
          line-height: 20px;
        }
        div.name {
          color: ${BOTTOM_MENU_GREY};
        }
      `}</style>
      <li style={style} className="MobileOverviewInfoItem" key={name}>
        <div className="name">{name}:</div>
        <span> </span>
        <div style={valueStyle} className="value">
          {value}
        </div>
      </li>
    </>
  );
}
