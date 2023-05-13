import React, { Fragment, useState } from 'react';

import { DatePickerMobile } from 'components/inputs/date-picker/date-picker-mobile';
import { MobileCheckboxFilter } from 'components/inputs/mobile-checkbox-filter';
import { TextInput } from 'components/inputs/text-input';
import { DATE_PICKER_TYPES, TIME_SORT_NAME_LOOKUP } from 'data/data-inputs';
import { FONT_WEIGHT_TITLE, MOBILE_LIGHT_GREY } from 'data/data-style';
import { IHeaderItem } from 'models/models-data-general';
import { IDictionary } from 'models/models-general';
import { EHeaderIconType } from 'models/models-table-general';
import { filtersInit } from 'utils/inputs';
import { defined } from 'utils/variable-evaluation';

import { ITableMobileModalProps } from '../table-mobile-modal';
import { TableMobileModalControl } from '../table-mobile-modal-control';

export function TableMobileModalFilter(props: ITableMobileModalProps) {
  const { filterConfig, filters, onCloseModal } = props;
  const { currentFilters, onFilterChange } = filterConfig;
  const checkboxes = filters[EHeaderIconType.CheckboxFilter] || [];
  const textInputs = filters[EHeaderIconType.TextFilter] || [];

  const datepickers = (filters[EHeaderIconType.Sort] || []).filter((item: IHeaderItem) =>
    DATE_PICKER_TYPES.includes(item.type),
  );

  const init = filtersInit(checkboxes || [], datepickers || [], textInputs || []);

  const [modalFilters, setModalFilters] = useState({
    ...init,
    ...(currentFilters || {}),
  } as IDictionary<any[]>);

  const checkboxFilterKeys =
    filters && Object.keys(filters).filter((key: string) => key === EHeaderIconType.CheckboxFilter);

  const handleApply = () => {
    onFilterChange(modalFilters);
    onCloseModal();
  };

  const handleReset = () => {
    onFilterChange(init);
    onCloseModal();
  };

  return (
    <>
      <style jsx>{`
        div.TableMobileFilters {
          display: flex;
          justify-content: center;
          flex-direction: row;
          margin-top: 8px;
        }
        div.line {
          position: relative;
          width: 100%;
          height: 1px;
          background-color: ${MOBILE_LIGHT_GREY};
          margin-top: 16px;
        }
        div.date-picker {
          margin-top: 16px;
        }
        div.input-wrapper {
          padding: 8px 0;
        }
        div.input {
          padding: 16px 0 0;
        }
        h4.subtitle {
          font-size: 16px;
          font-weight: ${FONT_WEIGHT_TITLE};
          line-height: 20px;
        }
        div.checkbox {
          margin-top: 28px;
        }
        div.time {
          margin-top: 16px;
        }
      `}</style>
      <TableMobileModalControl
        title="Filter By"
        onCloseModal={onCloseModal}
        onApply={handleApply}
        onReset={handleReset}
      >
        <div>
          {checkboxFilterKeys.map((key: string) => (
            <Fragment key={key}>
              {filters[key].map((item: IHeaderItem) => (
                <div key={item.headerType} className="checkbox">
                  <h4 className="subtitle">Type</h4>
                  <MobileCheckboxFilter
                    selectedOptions={modalFilters[item.type]}
                    item={item}
                    onChange={(nextFilter) => {
                      setModalFilters({
                        ...modalFilters,
                        [nextFilter.type]: nextFilter.filterValue,
                      });
                    }}
                  />
                </div>
              ))}
            </Fragment>
          ))}
          {defined(textInputs) && textInputs.length > 0 && (
            <>
              {textInputs.map((item: IHeaderItem, index: number) => {
                const [value] = modalFilters[item.type];
                return (
                  <Fragment key={`text-input-${index}`}>
                    {checkboxFilterKeys.length > 0 && <div className="line" />}
                    <div className="input-wrapper">
                      <h4 className="subtitle">{item.headerType}</h4>
                      <div className="input">
                        <TextInput
                          value={value || ''}
                          onChange={(textValue) =>
                            setModalFilters({
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
          {defined(datepickers) && datepickers.length > 0 && (
            <>
              {datepickers.map((item: IHeaderItem, index: number) => {
                const dates = modalFilters[item.type] || [null, null];
                const [startDate, endDate] = dates;
                return (
                  <Fragment key={`date-picker-${index}`}>
                    {(checkboxFilterKeys.length > 0 || textInputs.length > 0) && (
                      <div className="line" />
                    )}
                    <div className="time">
                      <h4 className="subtitle">{TIME_SORT_NAME_LOOKUP[item.type]}</h4>
                      <div className="date-picker">
                        <DatePickerMobile
                          dates={[startDate, endDate]}
                          onChange={([start, end]) => {
                            setModalFilters({
                              ...modalFilters,
                              [item.type]: [start || startDate, end || endDate],
                            });
                          }}
                        />
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </>
          )}
        </div>
      </TableMobileModalControl>
    </>
  );
}
