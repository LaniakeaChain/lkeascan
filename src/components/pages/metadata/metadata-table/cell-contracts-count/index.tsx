import React from 'react';

import { ROW_HEIGHT } from 'components/table-content/desktop/table/table-data-row';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { IMetadataOption } from 'models/models-table-metadata';
import { formatWithCommas } from 'utils/format';
import { defined } from 'utils/variable-evaluation';

import { MetadataOptionsButton } from './metadata-options-control';

interface Props {
  options?: IMetadataOption[];
  count: number;
}

export function CellContractsCount(props: Props) {
  const { count, options } = props;
  return (
    <>
      <style jsx>{`
        div.CellContractsCount {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: ${ROW_HEIGHT}px;
        }
      `}</style>
      <div className="CellContractsCount">
        {count === 0 ? <TextOnly>0</TextOnly> : <TextOnly>{formatWithCommas(count)}</TextOnly>}
        {defined(options) && <MetadataOptionsButton options={options} />}
      </div>
    </>
  );
}
