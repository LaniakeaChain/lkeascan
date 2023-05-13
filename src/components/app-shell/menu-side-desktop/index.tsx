import React from 'react';

import {
  MENU_SIDE_DESKTOP_ITEMS_BOTTOM,
  MENU_SIDE_DESKTOP_ITEMS_TOP,
} from 'data/data-side-content';
import { MAIN_TABLE_PADDING, MENU_SIDE_DESKTOP_WIDTH, VERTICAL_PADDING } from 'data/data-style';
import { containerHeight, useWindowSize } from 'utils/dimensions';

import { MenuSideDesktopItems } from './menu-side-desktop-items';

interface Props {
  currentName: string;
}

export function MenuSideDesktop({ currentName }: Props) {
  const windowSize = useWindowSize();
  return (
    <>
      <style jsx>{`
        div.MenuSideDesktop {
          position: absolute;
          top: ${VERTICAL_PADDING}px;
          left: 0;
          display: flex;
          width: ${MENU_SIDE_DESKTOP_WIDTH}px;
          height: ${containerHeight(windowSize) - (VERTICAL_PADDING + MAIN_TABLE_PADDING) * 2}px;
          padding-bottom: ${MAIN_TABLE_PADDING}px;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
      <div className="MenuSideDesktop">
        <MenuSideDesktopItems items={MENU_SIDE_DESKTOP_ITEMS_TOP} currentName={currentName} />
        <MenuSideDesktopItems items={MENU_SIDE_DESKTOP_ITEMS_BOTTOM} />
      </div>
    </>
  );
}
