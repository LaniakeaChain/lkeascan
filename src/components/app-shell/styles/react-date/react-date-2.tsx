import React from 'react';

import {
  DATE_RANGE_INPUT,
  HEADER_ICON_GREY,
  HI_BLUE,
  MOBILE_INPUT_GREY_TEXT,
  SVG_URL,
} from 'data/data-style';

export const REACT_DATE_2 = (
  <>
    <style global jsx>
      {`
        .DayPickerNavigation {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 0;
          z-index: 2;
        }
        .DayPickerNavigation__horizontal {
          height: 0;
          width: 256px;
        }
        .DayPickerNavigation__verticalDefault {
          position: absolute;
          width: 100%;
          height: 52px;
          bottom: 0;
          left: 0;
        }
        .DayPickerNavigation__verticalScrollableDefault {
          position: relative;
        }
        .DayPickerNavigation_button {
          width: 32px;
          height: 32px;
          cursor: pointer;
          user-select: none;
          border: 0;
          padding: 8px 0 0 8px;
          margin: 0;
        }
        .DayPickerNavigation_button:nth-child(2) {
          padding: 8px 8px 0 0;
        }
        .DayPickerNavigation_button__default {
          border: 1px solid #e4e7e7;
          background-color: #fff;
          color: #757575;
        }
        .DayPickerNavigation_button__default:focus,
        .DayPickerNavigation_button__default:hover {
          border: 1px solid #c4c4c4;
        }
        .DayPickerNavigation_button__default:active {
          background: #f2f2f2;
        }
        .DayPickerNavigation_button__disabled {
          cursor: default;
          border: 1px solid #f2f2f2;
        }
        .DayPickerNavigation_button__disabled:focus,
        .DayPickerNavigation_button__disabled:hover {
          border: 1px solid #f2f2f2;
        }
        .DayPickerNavigation_button__disabled:active {
          background: 0 0;
        }
        .DayPickerNavigation_button__horizontalDefault {
          position: absolute;
          top: 18px;
          line-height: 0.78;
          border-radius: 3px;
          padding: 6px 9px;
        }
        .DayPickerNavigation_button__verticalDefault {
          padding: 5px;
          background: #fff;
          box-shadow: 0 0 5px 2px rgba(0,0,0,.1);
          position: relative;
          display: inline-block;
          text-align: center;
          height: 100%;
          width: 50%;
        }
        .DayPickerNavigation_nextButton__verticalDefault {
          border-left: 0;
        }
        .DayPickerNavigation_nextButton__verticalScrollableDefault {
          width: 100%;
        }
        .DayPickerNavigation_svg__horizontal {
          height: 19px;
          width: 19px;
          fill: #82888a;
          display: block;
        }
        .DayPickerNavigation_svg__vertical {
          height: 42px;
          width: 42px;
          fill: #484848;
        }
        .DayPickerNavigation_svg__disabled {
          fill: #f2f2f2;
        }
        .DayPicker {
          background: #fff;
          position: relative;
          text-align: left;
        }
        .DayPicker__horizontal {
          background: #fff;
        }
        .DayPicker__verticalScrollable {
          height: 100%;
        }
        .DayPicker__hidden {
          visibility: hidden;
        }
        .DayPicker__withBorder {
          box-shadow: 0 2px 6px rgba(0,0,0,.05), 0 0 0 1px rgba(0,0,0,.07);
          border-radius: 3px;
        }
        .DayPicker_portal__horizontal {
          box-shadow: none;
          position: absolute;
          left: 50%;
          top: 50%;
        }
        .DayPicker_portal__vertical {
          position: initial;
        }
        .DayPicker_focusRegion {
          outline: 0;
        }
        .DayPicker_calendarInfo__horizontal,
        .DayPicker_wrapper__horizontal {
          display: inline-block;
          vertical-align: top;
        }
        .DayPicker_weekHeaders {
          position: relative;
        }
        .DayPicker_weekHeaders__horizontal {
        }
        .DayPicker_weekHeader {
          color: ${MOBILE_INPUT_GREY_TEXT};
          position: absolute;
          top: 56px;
          height: 24px;
          z-index: 2;
          text-align: left;
        }
        .DayPicker_weekHeader__vertical {
          left: 50%;
        }
        .DayPicker_weekHeader__verticalScrollable {
          top: 0;
          display: table-row;
          border-bottom: 1px solid #dbdbdb;
          background: #fff;
          margin-left: 0;
          left: 0;
          width: 100%;
          text-align: center;
        }
        .DayPicker_weekHeader_ul {
          list-style: none;
          margin: 1px 0;
          padding-left: 0;
          padding-right: 0;
          font-size: 14px;
        }
        .DayPicker_weekHeader_li {
          display: inline-block;
          text-align: center;
          visibility: hidden;
          font-size: 0;
          padding: 0 1px;
        }
        .DayPicker_weekHeader_li::first-letter {
          visibility: visible;
          font-weight: 500;
          font-size: 10px;
          line-height: 12px;
        }
        .DayPicker_transitionContainer {
          position: relative;
          overflow: hidden;
          border-radius: 3px;
        }
        .DayPicker_transitionContainer__horizontal {
        }
        .DayPicker_transitionContainer__vertical {
          width: 100%;
        }
        .DayPicker_transitionContainer__verticalScrollable {
          padding-top: 20px;
          height: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          overflow-y: scroll;
        }
        .DateInput {
          margin: 0;
          padding: 0;
          position: relative;
          display: inline-block;
          vertical-align: middle;
        }
        .DateInput__small {
          width: 97px;
        }
        .DateInput__block {
          width: 100%;
        }
        .DateInput__disabled {
          background: #f2f2f2;
          color: #dbdbdb;
        }
        .DateInput_input {
          font-size: 14px;
          line-height: 16px;
          height: 16px;
          color: ${HEADER_ICON_GREY};
          border: 1px solid ${DATE_RANGE_INPUT};
          width: 80px;
          padding: 7px 0 7px 38px;
          border-radius: 4px;
        }
        .DateInput_input:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 12px;
          /* background-image: url(${SVG_URL}); */
          transform: translateY(-50%);
        }
        .DateInput_input__focused {
          border: 1px solid ${HI_BLUE};
          outline: 0;
        }
        .DateInput_input__disabled {
          background: #f2f2f2;
          font-style: italic;
        }
        .DateInput_screenReaderMessage {
          border: 0;
          clip: rect(0,0,0,0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }
        .DateInput_fang {
          position: absolute;
          width: 20px;
          height: 11px;
          margin-top: -19px;
          left: 22px;
          z-index: 2;
        }
        .DateInput_fangShape {
          fill: #fff
        }
        .DateInput_fangStroke {
          stroke: #dbdbdb;
          fill: transparent;
        }
      `}
    </style>
  </>
);
