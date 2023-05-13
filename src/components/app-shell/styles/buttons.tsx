import React from 'react';

import {
  ACTIVE_BUTTON_GREY,
  ACTIVE_PURPLE_TEXT_MOBILE,
  BOTTOM_MENU_GREY,
  DESKTOP_WIDTH,
  HEADER_ICON_PURPLE,
  HI_BLUE,
  HOVER_BUTTON_GREY,
  HOVER_PURPLE_TEXT,
  LO_PURPLE,
  MOBILE_GREY_TEXT,
  MOBILE_TEXT,
} from 'data/data-style';

export const BUTTONS = (
  <>
    <style global jsx>
      {`
        .--tooltip {
          position: relative;
          top: 0;
          left: 0;
          height: 18px;
          line-height: 18px;
          min-width: 0;
        }

        .--ghost-square {
          color: ${BOTTOM_MENU_GREY};
          border: 1px solid ${BOTTOM_MENU_GREY};
          width: 76px;
        }
        .--ghost-square:hover {
          color: ${MOBILE_GREY_TEXT};
          border: 1px solid ${MOBILE_GREY_TEXT};
        }
        .--ghost-square:active {
          color: ${MOBILE_TEXT};
          border: 1px solid ${MOBILE_TEXT};
        }

        .--blue-square {
          color: #fff;
          background-color: ${HI_BLUE};
          box-shadow: 0px 2px 8px rgba(72, 58, 252, 0.25);
        }
        .--blue-square:hover {
          background-color: ${HOVER_PURPLE_TEXT};
        }
        .--blue-square:active {
          background-color: ${HEADER_ICON_PURPLE};
        }
        .--blue-square:disabled {
          background-color: ${LO_PURPLE};
        }

        .--text-link {
          color: #6a5efd;
        }
        .--text-link:hover {
          color: ${HOVER_PURPLE_TEXT};
          text-decoration: underline;
        }

        .--interactions:hover {
          background-color: ${HOVER_BUTTON_GREY};
        }
        .--interactions:active {
          background-color: ${ACTIVE_BUTTON_GREY};
        }

        @media (max-width: ${DESKTOP_WIDTH}px) {
          .--text-link,
          .--text-link:hover {
            color: #6a5efd;
          }
          .--text-link:active {
            color: ${ACTIVE_PURPLE_TEXT_MOBILE};
          }
          .--interactions:hover {
            background-color: transparent;
          }
          .--interactions:active {
            background-color: ${ACTIVE_BUTTON_GREY};
          }
        }
      `}
    </style>
  </>
);
