import React from 'react';

import { COPY } from './paths';

export const TOOLTIP = {
  CheckToolTip: (
    <svg
      width="14"
      height="14"
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
  CopyToolTip: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d={COPY.first} fill="currentColor" />
      <path d={COPY.second} fill="currentColor" />
    </svg>
  ),
};
