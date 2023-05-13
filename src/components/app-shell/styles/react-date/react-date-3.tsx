import React from 'react';

export const REACT_DATE_3 = (
  <>
    <style global jsx>
      {`
        .DateRangePickerInput {
          background-color: #fff;
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
        }
        .DateRangePickerInput__disabled {
          background: #f2f2f2;
        }
        .DateRangePickerInput__withBorder {
          border-radius: 2px;
          border: 1px solid #dbdbdb;
        }
        .DateRangePickerInput__rtl {
          direction: rtl;
        }
        .DateRangePickerInput__block {
          display: block;
        }
        .DateRangePickerInput__showClearDates {
          padding-right: 30px;
        }
        .DateRangePickerInput_arrow {
          display: none;
          vertical-align: middle;
          color: #484848;
        }
        .DateRangePickerInput_clearDates {
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
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }
        .DateRangePickerInput_clearDates__small {
          padding: 6px;
        }
        .DateRangePickerInput_clearDates_default:focus,
        .DateRangePickerInput_clearDates_default:hover {
          background: #dbdbdb;
          border-radius: 50%;
        }
        .DateRangePickerInput_clearDates__hide {
          visibility: hidden;
        }
        .DateRangePickerInput_clearDates_svg {
          fill: #82888a;
          height: 12px;
          width: 15px;
          vertical-align: middle;
        }
        .DateRangePickerInput_clearDates_svg__small {
          height: 9px;
        }
        .DateRangePickerInput_calendarIcon {
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
        .DateRangePickerInput_calendarIcon_svg {
          fill: #82888a;
          height: 15px;
          width: 14px;
          vertical-align: middle;
        }
        .DateRangePicker {
          position: relative;
          display: block;
        }
        .DateRangePicker__block {
          display: block;
        }
        .DateRangePicker_picker {
          z-index: 1;
          background-color: #fff;
          position: absolute;
          margin-top: -20px;
        }
        .DateRangePicker_picker__rtl {
          direction: rtl;
        }
        .DateRangePicker_picker__portal {
          background-color: rgba(0, 0, 0, 0.3);
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 9999;
        }
        .DateRangePicker_picker__fullScreenPortal {
          background-color: #fff;
        }
        .DateRangePicker_closeButton {
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
        .DateRangePicker_closeButton:focus,
        .DateRangePicker_closeButton:hover {
          color: darken(#cacccd, 10%);
          text-decoration: none;
        }
        .DateRangePicker_closeButton_svg {
          height: 15px;
          width: 15px;
          fill: #cacccd;
        }
      `}
    </style>
  </>
);
