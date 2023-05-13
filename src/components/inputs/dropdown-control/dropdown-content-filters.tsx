import React, { CSSProperties, ChangeEvent, Fragment, useState } from 'react';

import { DATE_PICKER_TYPES } from 'data/data-inputs';
import { FONT_WEIGHT_TITLE, MOBILE_LIGHT_GREY, MOBILE_TEXT } from 'data/data-style';
import { IHeaderItem } from 'models/models-data-general';
import { IDictionary } from 'models/models-general';
import { EHeaderIconType, IMultiFilterConfig } from 'models/models-table-general';
import { addToArrayIfNotThere, removeFromArrayIfThere } from 'utils/array';
import { removeSpaces } from 'utils/format';
import { filtersInit } from 'utils/inputs';
import { defined } from 'utils/variable-evaluation';

import { ButtonApply } from '../button-apply';
import { ButtonReset } from '../button-reset';
import {
  CheckboxFilterOption,
  ECheckboxFilterOptionType,
} from '../checkbox-filter/checkbox-filter-option';
import { DatePickerDesktop } from '../date-picker/date-picker-desktop';
import { TextInput } from '../text-input';

interface Props {
  style?: CSSProperties;
  onClose?(): void;
  filterConfig: IMultiFilterConfig;
  children: IDictionary<IHeaderItem[]>;
}

export function DropdownContentFilters(props: Props) {
  const { children, filterConfig, onClose, style } = props;
  const checkboxes = children[EHeaderIconType.CheckboxFilter] || [];
  const textInputs = children[EHeaderIconType.TextFilter] || [];

  const datepickers = (children[EHeaderIconType.Sort] || []).filter((item: IHeaderItem) =>
    DATE_PICKER_TYPES.includes(item.type),
  );

  const { currentFilters, onFilterChange } = filterConfig;
  const init = filtersInit(checkboxes, datepickers, textInputs);

  const [filters, setFilters] = useState({
    ...init,
    ...(currentFilters || {}),
  } as IDictionary<any[]>);

  const handleReset = () => {
    setFilters(init);
    onFilterChange(init);
    onClose();
  };

  const handleApply = () => {
    onFilterChange(filters);
    onClose();
  };

  const isCheckboxes = checkboxes.length > 0;

  return (
    <>
      <style jsx>{`
        div.DropdownContentFilters {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          list-style-type: none;
          background-color: #fff;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.0494509), 0px 5px 8px rgba(0, 0, 0, 0.1);
          width: 284px;
          padding: 8px 0;
          color: ${MOBILE_TEXT};
          z-index: 100;
        }
        div.checkboxes,
        div.date-picker {
          position: relative;
          padding-bottom: 8px;
        }
        div.input-wrapper {
          padding: 8px 0;
        }
        div.input {
          padding: 8px 16px;
        }
        div.line {
          position: relative;
          left: 16px;
          width: calc(100% - 32px);
          height: 1px;
          background-color: ${MOBILE_LIGHT_GREY};
        }
        h4.subtitle {
          font-size: 14px;
          font-weight: ${FONT_WEIGHT_TITLE};
          line-height: 16px;
          padding: 8px 16px;
        }
        ul.filters {
          list-style-type: none;
          padding: 0 8px;
        }
        div.buttons {
          margin-top: 16px;
          padding: 0 16px 16px;
        }
      `}</style>
      <div className="DropdownContentFilters" style={style}>
        {isCheckboxes && (
          <div className="checkboxes">
            {checkboxes.map((item: IHeaderItem) => (
              <div key={item.headerType} className="checkbox">
                <h4 className="subtitle">{item.headerType}</h4>
                <ul className="filters">
                  {item.options.map((option: string) => (
                    <CheckboxFilterOption
                      key={option}
                      type={ECheckboxFilterOptionType.Desktop}
                      label={option}
                      option={option}
                      isChecked={filters[item.type].includes(removeSpaces(option))}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const { checked, name } = e.currentTarget;

                        let nextFilters: string[] = removeFromArrayIfThere(
                          filters[item.type],
                          removeSpaces(name),
                        );

                        if (checked) {
                          nextFilters = addToArrayIfNotThere(
                            filters[item.type],
                            removeSpaces(name),
                          );
                        }

                        setFilters({
                          ...filters,
                          [item.type]: nextFilters,
                        });
                      }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {textInputs.length > 0 && (
          <>
            {textInputs.map((item: IHeaderItem, index: number) => {
              const [value] = filters[item.type];
              return (
                <Fragment key={`text-input-${index}`}>
                  {(isCheckboxes || (!isCheckboxes && index !== 0)) && <div className="line" />}
                  <div className="input-wrapper">
                    <h4 className="subtitle">{item.headerType}</h4>
                    <div className="input">
                      <TextInput
                        value={value || ''}
                        onChange={(textValue) =>
                          setFilters({
                            ...filters,
                            [item.type]: [textValue],
                          })
                        }
                      />
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </>
        )}
        {datepickers.length > 0 && (
          <>
            {datepickers.map((item: IHeaderItem, index: number) => {
              const dates = filters[item.type] || [null, null];
              const [startDate, endDate] = dates;
              return (
                <Fragment key={`date-picker-${index}`}>
                  {(isCheckboxes || (!isCheckboxes && index !== 0) || textInputs.length > 0) && (
                    <div className="line" />
                  )}
                  <div className="date-picker" style={{ zIndex: datepickers.length - index }}>
                    <DatePickerDesktop
                      type={item.type}
                      dates={{ startDate, endDate }}
                      onChange={(nextDates) => {
                        setFilters({
                          ...filters,
                          [item.type]: [
                            defined(nextDates.startDate) ? nextDates.startDate : null,
                            defined(nextDates.endDate) ? nextDates.endDate : null,
                          ],
                        });
                      }}
                    />
                  </div>
                </Fragment>
              );
            })}
          </>
        )}
        <div className="buttons">
          <ButtonReset isDesktop onClick={handleReset} />
          <ButtonApply isDesktop onClick={handleApply} />
        </div>
      </div>
    </>
  );
}
