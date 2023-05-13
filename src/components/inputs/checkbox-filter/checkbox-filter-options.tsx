import React, { ChangeEvent } from 'react';

import { IDictionary } from 'models/models-general';
import { removeSpaces } from 'utils/format';

import { CheckboxFilterOption } from './checkbox-filter-option';

interface Props {
  optionsLabelLookup?: IDictionary<string>;
  selectedOptions: string[];
  options: string[];
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export function CheckboxFilterOptions(props: Props) {
  const { onChange, options, optionsLabelLookup, selectedOptions } = props;
  return (
    <>
      <style jsx>{`
        ul.options {
          list-style: none;
        }
      `}</style>
      <ul className="options">
        {options.map((option: string) => (
          <CheckboxFilterOption
            key={option}
            option={option}
            label={optionsLabelLookup ? optionsLabelLookup[option] : option}
            isChecked={selectedOptions.includes(removeSpaces(option))}
            onChange={onChange}
          />
        ))}
      </ul>
    </>
  );
}
