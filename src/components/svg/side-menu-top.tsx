import React from 'react';

import { PROFILE_PATH } from './paths';

const pathDashboard =
  'M10.5116 1.00887C10.2107 0.774815 9.78931 0.774815 9.48838 1.00887L1.98838' +
  ' 6.8422C1.78539 7.00008 1.66667 7.24284 1.66667 7.5V16.6667C1.66667 17.3297 1.93006 17.9656 2.3989 ' +
  '18.4344C2.86774 18.9033 3.50362 19.1667 4.16667 19.1667L7.5 19.1667H12.5L15.8333 19.1667C16.4964 19.1667 ' +
  '17.1323 18.9033 17.6011 18.4344C18.0699 17.9656 18.3333 17.3297 18.3333 16.6667V7.5C18.3333 7.24284 18.2146 ' +
  '7.00008 18.0116 6.8422L10.5116 1.00887ZM13.3333 17.5H15.8333C16.0543 17.5 16.2663 17.4122 16.4226 ' +
  '17.2559C16.5789 17.0996 16.6667 16.8877 16.6667 16.6667V7.90757L10 2.72238L3.33333 7.90757V16.6667C3.33333 ' +
  '16.8877 3.42113 17.0996 3.57741 17.2559C3.73369 17.4122 3.94565 17.5 4.16667 17.5H6.66667V9.99999C6.66667 ' +
  '9.53976 7.03976 9.16666 7.5 9.16666H12.5C12.9602 9.16666 13.3333 9.53976 13.3333 9.99999V17.5ZM8.33333 ' +
  '17.5V10.8333H11.6667V17.5H8.33333Z';

export const SIDE_MENU_TOP = {
  Dashboard: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d={pathDashboard} fill="currentColor" />
    </svg>
  ),
  Contracts: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
  Tokens: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <rect x="9" y="9" width="6" height="6" />
    </svg>
  ),
  Transactions: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Blocks: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
      <polyline points="2.32 6.16 12 11 21.68 6.16" />
      <line x1="12" y1="22.76" x2="12" y2="11" />
    </svg>
  ),
  Profile: (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
      <path
        d={PROFILE_PATH}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 10.0833C13.025 10.0833 14.6666 8.44171 14.6666 6.41667C14.6666 4.39162 13.025 2.75 11 2.75C8.97494 2.75 7.33331 4.39162 7.33331 6.41667C7.33331 8.44171 8.97494 10.0833 11 10.0833Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Events: (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"
      />
    </svg>
  ),
  Network: (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        fill="currentColor"
        d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z"
      />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  ),
};
