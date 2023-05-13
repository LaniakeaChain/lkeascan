import { EDirectionType, TSortAndFilterType } from './models-data-general';

export interface IRadioSortItem {
  value: string;
  sort: TSortAndFilterType;
  direction: EDirectionType;
}

export interface IDropdownOption<Value = string> {
  label: string;
  value?: Value;
  onChange?(): void;
  className?: string;
}
