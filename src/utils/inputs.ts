import { SORT_DIRECTION_LOOKUP } from 'data/data-inputs';
import {
  EDirectionType,
  IHeaderItem,
  THeaderType,
  TSortAndFilterType,
} from 'models/models-data-general';
import { IDictionary } from 'models/models-general';
import { IRadioSortItem } from 'models/models-inputs';
import { EHeaderIconType } from 'models/models-table-general';

import { defined } from './variable-evaluation';

export function radioSortItem(
  headerType: THeaderType,
  sort: TSortAndFilterType,
  direction: EDirectionType,
): IRadioSortItem {
  return {
    value: radioSortValue(headerType, direction),
    sort,
    direction,
  };
}

export function radioSortValue(headerType: THeaderType, direction: EDirectionType) {
  if (defined(headerType)) {
    return `${headerType} - ${SORT_DIRECTION_LOOKUP[headerType][direction]}`;
  } else {
    return null;
  }
}

export function headerItemsToFilters(headerItems: IHeaderItem[]): IDictionary<IHeaderItem[]> {
  return headerItems.reduce((a: IDictionary<IHeaderItem[]>, c: IHeaderItem) => {
    if (c.headerIconType === EHeaderIconType.CheckboxFilter) {
      if (a[EHeaderIconType.CheckboxFilter]) {
        a[EHeaderIconType.CheckboxFilter].push(c);
      } else {
        a[EHeaderIconType.CheckboxFilter] = [c];
      }
    } else if (c.headerIconType === EHeaderIconType.TextFilter) {
      if (a[EHeaderIconType.TextFilter]) {
        a[EHeaderIconType.TextFilter].push(c);
      } else {
        a[EHeaderIconType.TextFilter] = [c];
      }
    } else if (c.headerIconType === EHeaderIconType.Sort) {
      if (a[EHeaderIconType.Sort]) {
        a[EHeaderIconType.Sort].push(c);
      } else {
        a[EHeaderIconType.Sort] = [c];
      }
    }

    return a;
  }, {});
}

export function filtersInit(
  checkboxes: IHeaderItem[],
  datepickers: IHeaderItem[],
  textInputs: IHeaderItem[],
): IDictionary<any[]> {
  let filters = {};

  checkboxes.forEach((item: IHeaderItem) => {
    filters = { ...filters, [item.type]: [] };
  });

  textInputs.forEach((item: IHeaderItem) => {
    filters = { ...filters, [item.type]: [null] };
  });

  datepickers.forEach((item: IHeaderItem) => {
    filters = { ...filters, [item.type]: [null, null] };
  });

  return filters;
}
