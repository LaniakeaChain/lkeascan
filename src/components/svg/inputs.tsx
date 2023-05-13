import React from 'react';

import { CANCEL_CIRCLE } from './paths';

const CALENDAR_1 =
  'M2.91675 2.91667C2.59458 2.91667 2.33341 3.17783 2.33341 3.5V11.6667C2.33341' +
  ' 11.9888 2.59458 12.25 2.91675 12.25H11.0834C11.4056 12.25 11.6667 11.9888 11.6667 11.6667V3.5C11.6667 ' +
  '3.17783 11.4056 2.91667 11.0834 2.91667H2.91675ZM1.16675 3.5C1.16675 2.5335 1.95025 1.75 2.91675 ' +
  '1.75H11.0834C12.0499 1.75 12.8334 2.5335 12.8334 3.5V11.6667C12.8334 12.6332 12.0499 13.4167 11.0834 ' +
  '13.4167H2.91675C1.95025 13.4167 1.16675 12.6332 1.16675 11.6667V3.5Z';

const CALENDAR_2 =
  'M9.33333 0.583328C9.6555 0.583328 9.91667 0.844495 9.91667' +
  ' 1.16666V3.49999C9.91667 3.82216 9.6555 4.08333 9.33333 4.08333C9.01117 4.08333 8.75 3.82216 8.75 ' +
  '3.49999V1.16666C8.75 0.844495 9.01117 0.583328 9.33333 0.583328Z';

const CALENDAR_3 =
  'M4.66659 0.583328C4.98875 0.583328 5.24992 0.844495 5.24992 1.16666V3.49999C5.24992 ' +
  '3.82216 4.98875 4.08333 4.66659 4.08333C4.34442 4.08333 4.08325 3.82216 4.08325 3.49999V1.16666C4.08325 ' +
  '0.844495 4.34442 0.583328 4.66659 0.583328Z';

const CALENDAR_4 =
  'M1.16675 5.83333C1.16675 5.51117 1.42792 5.25 1.75008 5.25H12.2501C12.5722' +
  ' 5.25 12.8334 5.51117 12.8334 5.83333C12.8334 6.1555 12.5722 6.41667 12.2501 6.41667H1.75008C1.42792 ' +
  '6.41667 1.16675 6.1555 1.16675 5.83333Z';

export const INPUTS = {
  Calendar: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={CALENDAR_1} fill="currentColor" />
      <path d={CALENDAR_2} fill="currentColor" />
      <path d={CALENDAR_3} fill="currentColor" />
      <path d={CALENDAR_4} fill="currentColor" />
    </svg>
  ),
  CheckRadio: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  CheckCheckbox: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  CancelCircle: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="#999999" />
      <path fillRule="evenodd" clipRule="evenodd" d={CANCEL_CIRCLE} fill="#F2F2F3" />
    </svg>
  ),
};
