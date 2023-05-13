import React from 'react';

export const REACT_DATE = (
  <>
    <style global jsx>
      {`
        .PresetDateRangePicker_panel {
          padding: 0 22px 11px;
        }
        .PresetDateRangePicker_button {
          position: relative;
          height: 100%;
          text-align: center;
          background: 0 0;
          border: 1px solid #00a699;
          color: #00a699;
          padding: 4px 12px;
          margin-right: 8px;
          font: inherit;
          font-weight: 700;
          line-height: normal;
          overflow: visible;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          cursor: pointer;
        }
        .PresetDateRangePicker_button:active {
          outline: 0;
        }
        .PresetDateRangePicker_button__selected {
          color: #fff;
          background: #00a699;
        }
        .SingleDatePickerInput {
          display: inline-block;
          background-color: #fff;
        }
        .SingleDatePickerInput__withBorder {
          border-radius: 2px;
          border: 1px solid #dbdbdb;
        }
        .SingleDatePickerInput__rtl {
          direction: rtl;
        }
        .SingleDatePickerInput__disabled {
          background-color: #f2f2f2;
        }
        .SingleDatePickerInput__block {
          display: block;
        }
        .SingleDatePickerInput__showClearDate {
          padding-right: 30px;
        }
        .SingleDatePickerInput_clearDate {
          background: 0 0;
          border: 0;
          color: inherit;
          font: inherit;
          line-height: normal;
          overflow: visible;
          cursor: pointer;
          padding: 10px;
          margin: 0 10px 0 5px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .SingleDatePickerInput_clearDate__default:focus,
        .SingleDatePickerInput_clearDate__default:hover {
          background: #dbdbdb;
          border-radius: 50%;
        }
        .SingleDatePickerInput_clearDate__small {
          padding: 6px;
        }
        .SingleDatePickerInput_clearDate__hide {
          visibility: hidden;
        }
        .SingleDatePickerInput_clearDate_svg {
          fill: #82888a;
          height: 12px;
          width: 15px;
          vertical-align: middle;
        }
        .SingleDatePickerInput_clearDate_svg__small {
          height: 9px;
        }
        .SingleDatePickerInput_calendarIcon {
          background: 0 0;
          border: 0;
          color: inherit;
          font: inherit;
          line-height: normal;
          overflow: visible;
          cursor: pointer;
          display: inline-block;
          vertical-align: middle;
          padding: 10px;
          margin: 0 5px 0 10px;
        }
        .SingleDatePickerInput_calendarIcon_svg {
          fill: #82888a;
          height: 15px;
          width: 14px;
          vertical-align: middle;
        }
        .SingleDatePicker {
          position: relative;
          display: inline-block;
        }
        .SingleDatePicker__block {
          display: block;
        }
        .SingleDatePicker_picker {
          z-index: 1;
          background-color: #fff;
          position: absolute;
        }
        .SingleDatePicker_picker__rtl {
          direction: rtl;
        }
        .SingleDatePicker_picker__directionLeft {
          left: 0;
        }
        .SingleDatePicker_picker__directionRight {
          right: 0;
        }
        .SingleDatePicker_picker__portal {
          background-color: rgba(0, 0, 0, 0.3);
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }
        .SingleDatePicker_picker__fullScreenPortal {
          background-color: #fff;
        }
        .SingleDatePicker_closeButton {
          background: 0 0;
          border: 0;
          color: inherit;
          font: inherit;
          line-height: normal;
          overflow: visible;
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          padding: 15px;
          z-index: 2;
        }
        .SingleDatePicker_closeButton:focus,
        .SingleDatePicker_closeButton:hover {
          color: darken(#cacccd, 10%);
          text-decoration: none;
        }
        .SingleDatePicker_closeButton_svg {
          height: 15px;
          width: 15px;
          fill: #cacccd;
        }
        .DayPickerKeyboardShortcuts_buttonReset {
          background: 0 0;
          border: 0;
          border-radius: 0;
          color: inherit;
          font: inherit;
          line-height: normal;
          overflow: visible;
          padding: 0;
          cursor: pointer;
          font-size: 14px;
        }
        .DayPickerKeyboardShortcuts_buttonReset:active {
          outline: 0;
        }
        .DayPickerKeyboardShortcuts_show {
          width: 33px;
          height: 26px;
          position: absolute;
          z-index: 2;
        }
        .DayPickerKeyboardShortcuts_show::before {
          content: '';
          display: block;
          position: absolute;
        }
        .DayPickerKeyboardShortcuts_show__bottomRight {
          bottom: 0;
          right: 0;
        }
        .DayPickerKeyboardShortcuts_show__bottomRight::before {
          border-top: 26px solid transparent;
          border-right: 33px solid #00a699;
          bottom: 0;
          right: 0;
        }
        .DayPickerKeyboardShortcuts_show__bottomRight:hover::before {
          border-right: 33px solid #008489;
        }
        .DayPickerKeyboardShortcuts_show__topRight {
          top: 0;
          right: 0;
        }
        .DayPickerKeyboardShortcuts_show__topRight::before {
          border-bottom: 26px solid transparent;
          border-right: 33px solid #00a699;
          top: 0;
          right: 0;
        }
        .DayPickerKeyboardShortcuts_show__topRight:hover::before {
          border-right: 33px solid #008489;
        }
        .DayPickerKeyboardShortcuts_show__topLeft {
          top: 0;
          left: 0;
        }
        .DayPickerKeyboardShortcuts_show__topLeft::before {
          border-bottom: 26px solid transparent;
          border-left: 33px solid #00a699;
          top: 0;
          left: 0;
        }
        .DayPickerKeyboardShortcuts_show__topLeft:hover::before {
          border-left: 33px solid #008489;
        }
        .DayPickerKeyboardShortcuts_showSpan {
          color: #fff;
          position: absolute;
        }
        .DayPickerKeyboardShortcuts_showSpan__bottomRight {
          bottom: 0;
          right: 5px;
        }
        .DayPickerKeyboardShortcuts_showSpan__topRight {
          top: 1px;
          right: 5px;
        }
        .DayPickerKeyboardShortcuts_showSpan__topLeft {
          top: 1px;
          left: 5px;
        }
        .DayPickerKeyboardShortcuts_panel {
          overflow: auto;
          background: #fff;
          border: 1px solid #dbdbdb;
          border-radius: 2px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 2;
          padding: 22px;
          margin: 33px;
          text-align: left;
        }
        .DayPickerKeyboardShortcuts_title {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }
        .DayPickerKeyboardShortcuts_list {
          list-style: none;
          padding: 0;
          font-size: 14px;
        }
        .DayPickerKeyboardShortcuts_close {
          position: absolute;
          right: 22px;
          top: 22px;
          z-index: 2;
        }
        .DayPickerKeyboardShortcuts_close:active {
          outline: 0;
        }
        .DayPickerKeyboardShortcuts_closeSvg {
          height: 15px;
          width: 15px;
          fill: #cacccd;
        }
        .DayPickerKeyboardShortcuts_closeSvg:focus,
        .DayPickerKeyboardShortcuts_closeSvg:hover {
          fill: #82888a;
        }
      `}
    </style>
  </>
);
