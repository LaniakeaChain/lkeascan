import React from 'react';

import { MENU_SIDE_DESKTOP_WIDTH } from 'data/data-style';
import { IMenuItem } from 'models/models-side-menu';

import MenuSideDesktopItem from './menu-side-desktop-items';

interface Props {
  items: IMenuItem[];
  currentName?: string;
}

export function MenuSideDesktopItems(props: Props) {
  const { currentName, items } = props;
  return (
    <>
      <style jsx>{`
        ul.MenuSideDesktopItems {
          display: flex;
          width: ${MENU_SIDE_DESKTOP_WIDTH}px;
          flex-direction: column;
          list-style-type: none;
        }
      `}</style>
      <ul className="MenuSideDesktopItems">
        {items.map((item: IMenuItem) => (
          <li key={item.name}>
            <MenuSideDesktopItem isSelected={currentName === item.name} {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}
