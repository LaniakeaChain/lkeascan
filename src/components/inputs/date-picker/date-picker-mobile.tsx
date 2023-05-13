import classNames from 'classnames';
import moment from 'moment';
import React, { ChangeEvent, useState } from 'react';
import { UIDConsumer } from 'react-uid';

import { ICON } from 'components/svg';
import {
  DATE_RANGE_INPUT,
  HEADER_ICON_GREY,
  HI_BLUE,
  MOBILE_INPUT_GREY_TEXT,
} from 'data/data-style';
import { isSafariMobile } from 'utils/detectors';

const TODAY = moment().format('YYYY-MM-DD');

interface Props {
  dates: moment.Moment[];
  onChange(dates: moment.Moment[]): void;
}

export function DatePickerMobile(props: Props) {
  const [startDate, endDate] = props.dates;
  const [types, setTypes] = useState(['text', 'text']);
  const [startType, endType] = types;

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (id.includes('start')) {
      props.onChange([moment(e.target.value), endDate]);
    } else {
      props.onChange([startDate, moment(e.target.value)]);
    }
  };

  const handleTouchStart = (_, id: string) => {
    if (id.includes('start')) {
      setTypes(['date', endType]);
    } else {
      setTypes([startType, 'date']);
    }
  };

  const handleBlur = (_, id: string) => {
    if (id.includes('start')) {
      setTypes(['text', endType]);
    } else {
      setTypes([startType, 'text']);
    }
  };

  const formatValue = (date: moment.Moment, type) => {
    if (date) {
      if (type === 'text') {
        return date.format('DD.MM.YYYY');
      } else {
        return date.format('YYYY-MM-DD');
      }
    } else {
      return '';
    }
  };

  return (
    <>
      <style jsx>{`
        div.DatePickerMobile {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          margin-top: 8px;
        }
        label {
          position: relative;
          width: calc(50% - 6px);
        }
        input {
          font-size: 14px;
          line-height: 16px;
          height: 16px;
          color: ${HEADER_ICON_GREY};
          border: 1px solid ${DATE_RANGE_INPUT};
          width: calc(100% - 52px);
          padding: 7px 12px 7px 38px;
          border-radius: 4px;
        }
        div.DatePickerMobile.isSafari input {
          /*
          hack from https://thingsthemselves.com/no-input-zoom-in-safari-on-iphone-the-pixel-perfect-way/
          to disable safari input zoom on font-size < 16px
          enlarge by 16/14 = 114.28%
        */
          font-size: 16px;
          line-height: 18.29px;
          height: 18.29px;
          border: 1.14px solid ${DATE_RANGE_INPUT};
          width: calc(114.28% - 59.43px);
          padding: 8px 13.71px 8px 43.43px;
          border-radius: 4.57px;
          /*
          scale down by 14/16 = 87.5%
        */
          transform: scale(0.875);
          transform-origin: 0 50%;
        }
        input:focus {
          border: 1px solid ${HI_BLUE};
        }
        div.DatePickerMobile.isSafari input:focus {
          border: 1.14px solid ${HI_BLUE};
        }
        div.DatePickerMobile.isStartDate input.--start,
        div.DatePickerMobile.isEndDate input.--end {
          color: ${MOBILE_INPUT_GREY_TEXT};
          padding: 7px 12px;
          width: calc(100% - 26px);
        }
        div.DatePickerMobile.isStartDate.isSafari input.--start,
        div.DatePickerMobile.isEndDate.isSafari input.--end {
          color: ${MOBILE_INPUT_GREY_TEXT};
          padding: 8px 13.71px;
          width: calc(114.28% - 29.71px);
        }
        div.icon {
          position: absolute;
          left: 12px;
          top: 50%;
          color: ${HEADER_ICON_GREY};
          transform: translateY(-50%);
          z-index: 1;
        }
      `}</style>
      <div
        className={classNames('DatePickerMobile', {
          isStartDate: Boolean(startDate),
          isEndDate: Boolean(endDate),
          isSafari: isSafariMobile(),
        })}
      >
        <UIDConsumer>
          {(uid: string) => {
            const id = `start-${uid}`;
            return (
              <label htmlFor={id}>
                {!startDate && <div className="icon">{ICON.Calendar}</div>}
                <input
                  id={id}
                  name={id}
                  className="--start"
                  value={formatValue(startDate, startType)}
                  type={startType}
                  placeholder="From"
                  pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                  max={TODAY}
                  onTouchStart={(e) => handleTouchStart(e, id)}
                  onBlur={(e) => handleBlur(e, id)}
                  onChange={(e) => handleChange(e, id)}
                />
              </label>
            );
          }}
        </UIDConsumer>
        <UIDConsumer>
          {(uid: string) => {
            const id = `end-${uid}`;
            return (
              <label htmlFor={id}>
                {!endDate && <div className="icon">{ICON.Calendar}</div>}
                <input
                  id={id}
                  name={id}
                  className="--end"
                  value={formatValue(endDate, endType)}
                  type={endType}
                  placeholder="To"
                  pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                  max={TODAY}
                  onTouchStart={(e) => handleTouchStart(e, id)}
                  onBlur={(e) => handleBlur(e, id)}
                  onChange={(e) => handleChange(e, id)}
                />
              </label>
            );
          }}
        </UIDConsumer>
      </div>
    </>
  );
}
