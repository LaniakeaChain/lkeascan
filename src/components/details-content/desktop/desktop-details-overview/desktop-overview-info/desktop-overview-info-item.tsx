import React, { CSSProperties } from 'react';

import { DARK_PURPLE_TEXT, LIGHT_GREY_TEXT } from 'data/data-style';
import { INameElementValue } from 'models/models-general';

interface Props extends INameElementValue {
  style: CSSProperties;
  valueStyle: CSSProperties;
}

export function DesktopOverviewInfoItem(props: Props) {
  const { name, style, value, valueStyle } = props;

  return (
    <>
      <style jsx>{`
        li.DesktopOverviewInfoItem {
          position: relative;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
        }
        div {
          position: relative;
          top: 0;
          font-size: 14px;
          line-height: 32px;
          color: ${DARK_PURPLE_TEXT};
        }
        div.name {
          margin-right: 12px;
          color: ${LIGHT_GREY_TEXT};
        }
      `}</style>
      <li style={style} className="DesktopOverviewInfoItem" key={name}>
        <div className="name">{name}:</div>
        <div style={valueStyle} className="value">
          {value}
        </div>
      </li>
    </>
  );
}
