import React from 'react';

import { INameElementValue } from 'models/models-general';

import { DesktopOverviewInfoItem } from './desktop-overview-info-item';

interface Props {
  info: INameElementValue[][];
}

export function DesktopOverviewInfo(props: Props) {
  const { info } = props;
  return (
    <>
      <style jsx>{`
        ul.DesktopOverviewInfo {
          position: relative;
          margin-top: 12px;
          list-style: none;
        }
        ul.OverviewInfo.--secondRow {
          margin-top: 0;
        }
      `}</style>
      {info.map((row: INameElementValue[], rowIndex: number) => (
        <ul
          key={`row-${rowIndex}`}
          className="DesktopOverviewInfo"
          style={{ zIndex: rowIndex, marginTop: rowIndex > 0 ? 0 : 12 }}
        >
          {row.map((infoItem: INameElementValue, itemIndex: number) => (
            <DesktopOverviewInfoItem
              key={infoItem.name}
              {...infoItem}
              style={{
                zIndex: itemIndex + 1,
              }}
              valueStyle={{
                marginRight: itemIndex === row.length - 1 ? 0 : 24,
              }}
            />
          ))}
        </ul>
      ))}
    </>
  );
}
