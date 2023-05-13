import React from 'react';

import { IRadioSortItem } from 'models/models-inputs';

import { MobileRadioFilterOption } from './mobile-radio-filter-option';

interface Props {
  items: IRadioSortItem[];
  selectedItem: string;
  onChange(selectedItem: IRadioSortItem): void;
}

export function MobileRadioFilter(props: Props) {
  const { items, onChange, selectedItem } = props;
  return (
    <>
      <style jsx>{`
        ul.options {
          list-style: none;
        }
      `}</style>
      <ul className="options">
        {items.map((item: IRadioSortItem) => (
          <MobileRadioFilterOption
            key={item.value}
            item={item}
            isChecked={item.value === selectedItem}
            onChange={(e) =>
              onChange({ value: e.currentTarget.value, sort: item.sort, direction: item.direction })
            }
          />
        ))}
      </ul>
    </>
  );
}
