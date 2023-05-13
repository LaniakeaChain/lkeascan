import classNames from 'classnames';
import moment from 'moment';
import React from 'react';

import { ICON } from 'components/svg';
import { TIME_SORT_NAME_LOOKUP } from 'data/data-inputs';
import { FONT_WEIGHT_TITLE, HEADER_ICON_GREY, MOBILE_INPUT_GREY_TEXT } from 'data/data-style';
import { TSortAndFilterType } from 'models/models-data-general';
import { IDictionary } from 'models/models-general';
import { defined } from 'utils/variable-evaluation';

import { DatePickerCustom, endDateId, startDateId } from './date-picker-custom';

interface Props {
  type: TSortAndFilterType;
  dates: IDictionary<string>;
  onChange(dates: IDictionary<moment.Moment>): void;
}

export function DatePickerDesktop(props: Props) {
  const { dates, onChange, type } = props;

  return (
    <>
      <style jsx>{`
        div.reset {
          margin-top: 68px;
          text-align: left;
        }
        div.reset button {
          font-size: 14px;
          line-height: 16px;
          cursor: pointer;
        }
        h4.subtitle {
          font-size: 14px;
          font-weight: ${FONT_WEIGHT_TITLE};
          line-height: 16px;
          padding: 8px 16px;
        }
        div.date-picker-wrapper,
        div.date-picker {
          margin: 8px 0;
        }
        div.date-picker {
          padding: 0 16px;
        }
        div.date-picker {
          position: relative;
        }
        div.date-picker.isStartDate :global(.DateInput_input[name=${startDateId}]),
        div.date-picker.isEndDate :global(.DateInput_input[name=${endDateId}]) {
          color: ${MOBILE_INPUT_GREY_TEXT};
        }
        div.icon {
          position: absolute;
          left: 28px;
          top: 50%;
          color: ${HEADER_ICON_GREY};
          transform: translateY(-50%);
          z-index: 1;
        }
        div.icon.end {
          left: 160px;
        }
      `}</style>
      <div className="date-picker-wrapper">
        <h4 className="subtitle">{TIME_SORT_NAME_LOOKUP[type]}</h4>
        <div
          className={classNames('date-picker', {
            isStartDate: defined(dates.startDate),
            isEndDate: defined(dates.endDate),
          })}
        >
          <div className="icon start">{ICON.Calendar}</div>
          <div className="icon end">{ICON.Calendar}</div>
          <DatePickerCustom dates={dates} onChange={onChange} />
        </div>
      </div>
    </>
  );
}
