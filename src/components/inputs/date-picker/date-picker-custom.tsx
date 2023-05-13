import { Moment, utc } from 'moment';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';

import { ICON } from 'components/svg';
import { InteractiveButton } from 'components/widgets/interactive-button';
import { IDictionary } from 'models/models-general';

export const startDateId = 'DatePicker-startDateId';
export const endDateId = 'DatePicker-endDateId';

interface Props {
  withPortal?: boolean;
  dates: IDictionary<string>;
  onChange(dates: IDictionary<Moment>): void;
}

export function DatePickerCustom(props: Props) {
  const { dates, onChange, withPortal } = props;
  const [focused, setFocus] = useState(null);

  const handleChange = ({ endDate, startDate }) => {
    startDate = startDate ? utc(startDate).startOf('day') : null;
    endDate = endDate ? utc(endDate).endOf('day') : null;
    onChange({ startDate, endDate });
  };

  return (
    <DateRangePicker
      isOutsideRange={(m: Moment) => utc().diff(m) < 0} // Future days are ignored
      displayFormat="DD.MM.YYYY"
      startDatePlaceholderText="From"
      endDatePlaceholderText="To"
      startDate={dates.startDate} // momentPropTypes.momentObj or null,
      startDateId={startDateId}
      endDate={dates.endDate} // momentPropTypes.momentObj or null,
      endDateId={endDateId}
      onDatesChange={handleChange} // PropTypes.func.isRequired,
      focusedInput={focused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={(focusedInput) => setFocus(focusedInput)} // PropTypes.func.isRequired,
      showDefaultInputIcon={false}
      withPortal={withPortal}
      enableOutsideDays
      noBorder
      numberOfMonths={1}
      daySize={30}
      minimumNights={0} // Allows you to select the same day
      navPrev={
        <InteractiveButton
          style={{
            width: 32,
            height: 32,
          }}
        >
          {ICON.ChevronLeft}
        </InteractiveButton>
      }
      navNext={
        <InteractiveButton
          style={{
            width: 32,
            height: 32,
          }}
        >
          {ICON.ChevronRight}
        </InteractiveButton>
      }
      hideKeyboardShortcutsPanel
    />
  );
}
