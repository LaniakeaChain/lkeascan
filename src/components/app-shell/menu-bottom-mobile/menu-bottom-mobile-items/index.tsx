import React from 'react';

import { MENU_BOTTOM_MOBILE_HEIGHT, WHITE } from 'data/data-style';
import { IMenuItem } from 'models/models-side-menu';

import MenuBottomMobileItem from './MenuBottomMobileItem';

interface Props {
  items: IMenuItem[];
  currentName?: string;
}

export function MenuBottomMobileItems(props: Props) {
  const { currentName, items } = props;
  return (
    <>
      <style jsx>{`
        ul.MenuBottomMobileItems {
          display: flex;
          width: 100%;
          height: ${MENU_BOTTOM_MOBILE_HEIGHT}px;
          flex-direction: row;
          justify-content: space-evenly;
          list-style-type: none;
          background-color: ${WHITE};
        }
      `}</style>
      <ul className="MenuBottomMobileItems">
        {items.map((item: IMenuItem) => (
          <li key={item.name}>
            <MenuBottomMobileItem isSelected={currentName === item.name} {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}
