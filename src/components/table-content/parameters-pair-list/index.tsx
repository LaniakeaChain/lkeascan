import classNames from 'classnames';
import React, { useMemo } from 'react';

import { DESKTOP_WIDTH } from 'data/data-style';
import { INameElementValue } from 'models/models-general';
import { applySortOrder } from 'utils/array';

import { ParametersPairItem } from './parameters-pair-item';

const PARAMETERS_SORT_ORDER = ['to', 'from', 'value'];

interface Props {
  info: INameElementValue[];
  isFunctionMeta?: boolean;
}

export function ParametersPairList({ info, isFunctionMeta }: Props) {
  const orderedItems = useMemo(() => {
    const notInSort = info.filter(
      (item: INameElementValue) => !PARAMETERS_SORT_ORDER.includes(item.name),
    );

    const sortedInfoItems = applySortOrder(info, PARAMETERS_SORT_ORDER, 'name');
    return [...notInSort, ...sortedInfoItems];
  }, [info]);

  return (
    <>
      <style jsx>{`
        ul.ParametersPairList {
          position: relative;
          list-style: none;
          margin: 17px 0;
          display: inline-block;
          z-index: 1;
        }
        ul.ParametersPairList.isFunctionMeta {
          margin: 12px 0 0 0;
          padding: 0;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          ul.ParametersPairList {
            margin: 4px 0 0;
            padding: 0 0 0 12px;
            border-left: 4px solid rgba(184, 184, 195, 0.7);
          }
        }
      `}</style>
      <ul className={classNames('ParametersPairList', { isFunctionMeta })}>
        {orderedItems.length > 0 &&
          orderedItems.map((infoItem: INameElementValue, index: number) => (
            <ParametersPairItem
              key={`${infoItem.name}-${index}`}
              {...infoItem}
              isFunctionMeta={isFunctionMeta}
            />
          ))}
      </ul>
    </>
  );
}
