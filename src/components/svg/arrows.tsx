import React from 'react';

const pathChevronLeftEnd =
  'M17.7 15.89L13.82 12L17.71 8.11C18.1 7.72 18.1 7.09 17.71 6.7C17.32 6.31 ' +
  '16.69 6.31 16.3 6.7L11.71 11.29C11.32 11.68 11.32 12.31 11.71 12.7L16.3 17.29C16.69 17.68 17.32 ' +
  '17.68 17.71 17.29C18.09 16.91 18.09 16.27 17.7 15.89ZM7 6C7.55 6 8 6.45 8 7V17C8 17.55 7.55 18 7 ' +
  '18C6.45 18 6 17.55 6 17V7C6 6.45 6.45 6 7 6Z';

const pathChevronLeft =
  'M14.71 6.70998C14.32 6.31998 13.69 6.31998 13.3 6.70998L8.70998 11.3C8.31998 ' +
  '11.69 8.31998 12.32 8.70998 12.71L13.3 17.3C13.69 17.69 14.32 17.69 14.71 17.3C15.1 16.91 15.1 ' +
  '16.28 14.71 15.89L10.83 12L14.71 8.11998C15.1 7.72998 15.09 7.08998 14.71 6.70998Z';

const pathChevronRight =
  'M9.29006 6.71002C8.90006 7.10002 8.90006 7.73002 9.29006' +
  ' 8.12002L13.1701 ' +
  '12L9.29006 15.88C8.90006 16.27 8.90006 16.9 9.29006 17.29C9.68006 17.68 10.3101 17.68 10.7001 ' +
  '17.29L15.2901 12.7C15.6801 12.31 15.6801 11.68 15.2901 11.29L10.7001 6.70002C10.3201 6.32002 ' +
  '9.68006 6.32002 9.29006 6.71002Z';

const pathChevronRightEnd =
  'M6.29006 8.11L10.1801 12L6.29006 15.89C5.90006 16.28 5.90006 16.91' +
  ' 6.29006 17.3C6.68006 17.69 7.31006 17.69 7.70006 17.3L12.2901 12.71C12.6801 12.32 12.6801 ' +
  '11.69 12.2901 11.3L7.70006 6.7C7.31006 6.31 6.68006 6.31 6.29006 6.7C5.91006 7.09 5.91006 7.73 ' +
  '6.29006 8.11ZM17.0001 6C17.5501 6 18.0001 6.45 18.0001 7V17C18.0001 17.55 17.5501 18 17.0001 ' +
  '18C16.4501 18 16.0001 17.55 16.0001 17V7C16.0001 6.45 16.4501 6 17.0001 6Z';

export const ARROWS = {
  ArrowRight: (
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  DropdownArrow: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  ),
  CaretUp: (
    <svg width="10" height="10" viewBox="0 0 1024 1024" fill="currentColor">
      <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
    </svg>
  ),
  CaretDown: (
    <svg width="10" height="10" viewBox="0 0 1024 1024" fill="currentColor">
      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
    </svg>
  ),
  DoubleChevronLeft: (
    <svg
      width="18"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline transform="translate(-4,0)" points="15 18 9 12 15 6" />
      <polyline transform="translate(4,0)" points="15 18 9 12 15 6" />
    </svg>
  ),
  DoubleChevronRight: (
    <svg
      width="18"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline transform="translate(-4,0)" points="9 18 15 12 9 6" />
      <polyline transform="translate(4,0)" points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronLeft: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d={pathChevronLeft} fill="currentColor" />
    </svg>
  ),
  ChevronRight: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d={pathChevronRight} fill="currentColor" />
    </svg>
  ),
  ChevronLeftEnd: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d={pathChevronLeftEnd} fill="currentColor" />
    </svg>
  ),
  ChevronRightEnd: (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d={pathChevronRightEnd} fill="currentColor" />
    </svg>
  ),
  ChevronDown: (
    <svg
      className="ARROWS--ChevronDown"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66687 3.33334L5.0002 6.66668L8.33354 3.33334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
