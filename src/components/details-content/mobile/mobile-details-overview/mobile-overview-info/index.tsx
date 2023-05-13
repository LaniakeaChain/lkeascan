import React from 'react';

import { INameElementValue } from 'models/models-general';
import { flatten } from 'utils/array';

import { MobileOverviewInfoItem } from './mobile-overview-info-item';

interface Props {
  info: INameElementValue[][];
}

export function MobileOverviewInfo({ info }: Props) {
  const flatInfo = flatten(info);
  return (
    <>
      <style jsx>{`
        ul.MobileOverviewInfo {
          position: relative;
          margin-bottom: 30px;
          list-style: none;
          z-index: 0;
        }
        ul.MobileOverviewInfo.--secondRow {
          margin-top: 0;
          z-index: 0;
        }
      `}</style>
      <ul className="MobileOverviewInfo">
        {flatInfo.map((infoItem: INameElementValue, itemIndex: number) => (
          <MobileOverviewInfoItem
            key={infoItem.name}
            {...infoItem}
            style={{
              zIndex: flatInfo.length - itemIndex - 1,
            }}
            valueStyle={{
              lineHeight: '20px',
            }}
          />
        ))}
      </ul>
    </>
  );
}
