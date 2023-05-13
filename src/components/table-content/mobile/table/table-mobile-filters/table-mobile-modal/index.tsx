import React from 'react';

import { IHeaderItem } from 'models/models-data-general';
import { IDictionary } from 'models/models-general';
import { IMultiFilterConfig, ISortConfig } from 'models/models-table-general';
import { renderSwitch } from 'utils/react';

import { EFilterType, IResetFilterConfig } from '..';
import { TableMobileModalFilter } from '../table-mobile-modal-filter';
import { TableMobileModalSort } from '../table-mobile-modal-sort';

export interface ITableMobileModalProps {
  filterConfig: IMultiFilterConfig;
  filters: IDictionary<IHeaderItem[]>;
  onCloseModal(): void;
  resetFilterConfig: IResetFilterConfig;
  selectedFilter: EFilterType;
  sortRowsConfig?: ISortConfig;
}

export function TableMobileModal(props: ITableMobileModalProps) {
  return (
    <>
      {renderSwitch(props.selectedFilter, {
        [EFilterType.Sort]: () => <TableMobileModalSort {...props} />,
        [EFilterType.Filter]: () => <TableMobileModalFilter {...props} />,
      })}
    </>
  );
}
