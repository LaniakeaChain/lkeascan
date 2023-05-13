import { EDirectionType, TSortAndFilterType } from './models-data-general';
import { IDictionary } from './models-general';
import { IDropdownOption } from './models-inputs';

export interface IPageNumberValues {
  page: number;
}

export interface IPageNumberConfig extends IPageNumberValues {
  onPageNumberChange(page: number): void;
}

export interface IRowsDisplayedValues {
  size: number;
}

export interface IRowsDisplayedConfig extends IRowsDisplayedValues {
  onRowsDisplayedChange(selectedOption: IDropdownOption): void;
}

export interface IFilterValue {
  currentFilters: string[];
  filter: string;
}

export interface IMultiFilterConfig {
  currentFilters: IDictionary<string[]>;
  onFilterChange(filters: IDictionary<any[]>): void;
}

export interface ISortValues {
  sort: TSortAndFilterType;
  direction: EDirectionType;
}

export interface ISortConfig extends ISortValues {
  onSortChange(sortValues: ISortValues): void;
}

export enum EHeaderIconType {
  CheckboxFilter = 'CheckboxFilter',
  TextFilter = 'TextFilter',
  RadioFilter = 'RadioFilter',
  Sort = 'Sort',
}

export interface ITableFetchConfig {
  pageNumberConfig?: IPageNumberConfig;
  sortRowsConfig?: ISortConfig;
  rowsDisplayedConfig?: IRowsDisplayedConfig;
  filterConfig?: IMultiFilterConfig;
}

export interface ITabItem {
  name: string;
  label?: string;
  link: {
    href: string | { pathname: string; query: { [key: string]: any } };
    as?: string | { pathname: string; query: { [key: string]: any } };
  };
  element: JSX.Element;
}
