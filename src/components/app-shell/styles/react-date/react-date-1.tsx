import React from 'react';

import {
  ACTIVE_BUTTON_GREY,
  HI_BLUE,
  HOVER_BUTTON_GREY,
  MOBILE_INPUT_GREY_TEXT,
} from 'data/data-style';

export const REACT_DATE_1 = (
  <>
    <style global jsx>
      {`
        .CalendarDay {
          position: relative;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          color: ${MOBILE_INPUT_GREY_TEXT};
          z-index: 1;
        }
        .CalendarDay:active,
        .CalendarDay:focus {
          outline: 0;
        }
        .CalendarDay__defaultCursor {
          cursor: default;
        }
        .CalendarDay__default {
          color: ${MOBILE_INPUT_GREY_TEXT};
          background: #fff;
        }
        .CalendarDay__hovered_offset {
          color: inherit;
        }
        .CalendarDay__outside {
          border: 0;
          background: #fff;
          color: rgba(73, 76, 92, 0.4);
        }
        .CalendarDay__outside:hover {
          border: 0;
        }
        .CalendarDay__highlighted_calendar {
          background: #ffe8bc;
          color: #484848;
        }
        .CalendarDay__highlighted_calendar:active,
        .CalendarDay__highlighted_calendar:hover {
          background: #ffce71;
        }
        .CalendarDay__selected_span {
          background: transparent;
          color: inherit;
        }
        .CalendarDay__selected {
          color: #fff;
        }
        .CalendarDay__selected:hover,
        .CalendarDay__selected:active {
          color: ${MOBILE_INPUT_GREY_TEXT};
        }
        .CalendarDay__selected:after,
        .CalendarDay:after {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          border-radius: 14px;
          color: #fff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
        .CalendarDay__selected:after {
          background: ${HI_BLUE};
        }
        .CalendarDay__selected:hover:after,
        .CalendarDay__default:hover:after {
          background-color: ${HOVER_BUTTON_GREY};
          color: ${MOBILE_INPUT_GREY_TEXT};
        }
        .CalendarDay__selected:active:after,
        .CalendarDay__default:active:after {
          background-color: ${ACTIVE_BUTTON_GREY};
          color: ${MOBILE_INPUT_GREY_TEXT};
        }
        .CalendarDay__blocked_out_of_range,
        .CalendarDay__blocked_out_of_range:active,
        .CalendarDay__blocked_out_of_range:hover {
          color: rgba(73, 76, 92, 0.4);
          background: #fff;
          cursor: not-allowed;
        }
        .CalendarDay__blocked_out_of_range.CalendarDay__default:after {
          background: #fff;
        }
        .CalendarMonth {
          background: #fff;
          text-align: center;
          vertical-align: top;
          user-select: none;
        }
        .CalendarMonth_table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        .CalendarMonth_verticalSpacing {
          border-collapse: separate;
        }
        .CalendarMonth_caption {
          position: relative;
          padding-bottom: 88px;
          width: 227px;
          caption-side: initial;
        }
        .CalendarMonth_caption strong {
          position: absolute;
          top: 16px;
          left: 50%;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          transform: translateX(-50%);
        }
        .CalendarMonth_caption__verticalScrollable {
          padding-top: 12px;
          padding-bottom: 7px;
        }
        .CalendarMonthGrid {
          background: #fff;
          text-align: left;
          z-index: 0;
        }
        .CalendarMonthGrid__animating {
          z-index: 1;
        }
        .CalendarMonthGrid__horizontal {
          position: absolute;
          left: 0;
        }
        .CalendarMonthGrid__vertical {
          margin: 0 auto;
        }
        .CalendarMonthGrid__vertical_scrollable {
          margin: 0 auto;
          overflow-y: scroll;
        }
        .CalendarMonthGrid_month__horizontal {
          display: inline-block;
          vertical-align: top;
          min-height: 100%;
        }
        .CalendarMonthGrid_month__hideForAnimation {
          position: absolute;
          z-index: -1;
          opacity: 0;
          pointer-events: none;
        }
        .CalendarMonthGrid_month__hidden {
          visibility: hidden;
        }
      `}
    </style>
  </>
);
