import React from 'react';

import { MENU_SIDE_MOBILE_ITEMS_TOP } from 'data/data-side-content';

import { MenuBottomMobileItems } from './menu-bottom-mobile-items';

interface Props {
  currentName: string;
}

export function MenuBottomMobile(props: Props) {
  const { currentName } = props;
  return (
    <>
      <style jsx>{`
        div.MenuBottomMobile {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 2;
        }
      `}</style>
      <div className="MenuBottomMobile">
        <MenuBottomMobileItems items={MENU_SIDE_MOBILE_ITEMS_TOP} currentName={currentName} />
      </div>
    </>
  );
}
