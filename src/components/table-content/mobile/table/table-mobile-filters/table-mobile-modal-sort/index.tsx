import React, { useState } from 'react';

import { MobileRadioFilter } from 'components/inputs/mobile-radio-filter';
import { SORT_NAME_LOOKUP } from 'data/data-inputs';
import { EDirectionType, IHeaderItem } from 'models/models-data-general';
import { IRadioSortItem } from 'models/models-inputs';
import { radioSortItem, radioSortValue } from 'utils/inputs';

import { EFilterType } from '..';
import { ITableMobileModalProps } from '../table-mobile-modal';
import { TableMobileModalControl } from '../table-mobile-modal-control';

export function TableMobileModalSort(props: ITableMobileModalProps) {
  const { filters, onCloseModal, resetFilterConfig, sortRowsConfig } = props;
  const { direction, onSortChange, sort } = sortRowsConfig;

  const [modalSort, setModalSort] = useState({
    sort,
    direction,
    value: radioSortValue(SORT_NAME_LOOKUP[sort], direction),
  } as IRadioSortItem);

  const handleApply = () => {
    const { value, ...nextSort } = modalSort;
    onSortChange(nextSort);
    onCloseModal();
  };

  const handleReset = () => {
    onSortChange(resetFilterConfig.resetSortBy);
    onCloseModal();
  };

  return (
    <TableMobileModalControl
      title="Sort By"
      onCloseModal={onCloseModal}
      onApply={handleApply}
      onReset={handleReset}
    >
      <div style={{ marginTop: 12 }}>
        <MobileRadioFilter
          items={filters[EFilterType.Sort].reduce((a: IRadioSortItem[], c: IHeaderItem) => {
            a = [
              ...a,
              radioSortItem(c.headerType, c.type, EDirectionType.ASC),
              radioSortItem(c.headerType, c.type, EDirectionType.DESC),
            ];

            return a;
          }, [])}
          selectedItem={modalSort.value}
          onChange={(selectedItem: IRadioSortItem) => {
            setModalSort(selectedItem);
          }}
        />
      </div>
    </TableMobileModalControl>
  );
}
