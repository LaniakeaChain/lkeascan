import React from 'react';

import {
  DESKTOP_WIDTH,
  FONT_FAMILY,
  FONT_MOBILE_FAMILY,
  FONT_WEIGHT_TEXT,
  LO_WHITE,
  MOBILE_TEXT,
  WHITE,
} from 'data/data-style';

import { BUTTONS } from './buttons';
import { EXTS } from './exts';
import { INPUT_PLACEHOLDER } from './input-placeholder';
import { REACT_DATE } from './react-date';
import { REACT_DATE_1 } from './react-date/react-date-1';
import { REACT_DATE_2 } from './react-date/react-date-2';
import { REACT_DATE_3 } from './react-date/react-date-3';

export const GLOBAL_STYLES = (
  <>
    <style global jsx>
      {`
        @import url('https://rsms.me/inter/inter.css');
        * {
          font-variant: none;
          text-rendering: geometricPrecision;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        html,
        body {
          margin: 0;
          padding: 0;
          font-weight: ${FONT_WEIGHT_TEXT};
          max-width: 100%;
          background-color: ${LO_WHITE};
          font-family: ${FONT_FAMILY};
          overflow-x: hidden;
        }
        #__next {
          height: 100%;
          overflow: hidden;
        }
        button {
          background-color: transparent;
          color: inherit;
          margin: 0;
          padding: 0;
          font-family: inherit;
          font-weight: inherit;
          border: none;
          cursor: pointer;
        }
        button:focus {
          outline: none;
        }
        a {
          text-decoration: none;
        }
        a:focus,
        a:active {
          outline: none;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          padding: 0;
          font-weight: ${FONT_WEIGHT_TEXT};
        }
        p {
          margin: 0;
        }
        svg {
          display: block;
        }
        ul {
          padding: 0;
          margin: 0;
        }
        textarea {
          font-family: inherit;
          font-weight: inherit;
        }
        input {
          background-color: transparent;
          width: 100%;
          height: 100%;
          font-family: inherit;
          font-weight: inherit;
          margin: 0;
          padding: 0;
          border: none;
          color: ${WHITE};
          -webkit-appearance: none;
        }
        input:focus {
          outline: none;
        }
        table {
          border-collapse: collapse;
        }
        @keyframes fade-in {
          from {
            transform: translate3d(0, 12px, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          html,
          body {
            background-color: ${WHITE};
            font-family: ${FONT_MOBILE_FAMILY};
          }
          html,
          body,
          #__next {
            min-height: auto;
          }
          body {
            color: ${MOBILE_TEXT};
          }
        }
      `}
    </style>
    {REACT_DATE}
    {REACT_DATE_1}
    {REACT_DATE_2}
    {REACT_DATE_3}
    {BUTTONS}
    {INPUT_PLACEHOLDER}
    {EXTS}
  </>
);
