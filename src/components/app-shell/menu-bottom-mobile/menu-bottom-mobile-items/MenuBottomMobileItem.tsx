import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ICON } from 'components/svg';
import { BOTTOM_MENU_GREY, FONT_WEIGHT_TITLE, MOBILE_TEXT } from 'data/data-style';
import { IMenuItem } from 'models/models-side-menu';

interface Props extends IMenuItem {
  isSelected: boolean;
}

function MenuBottomMobileItem(props: Props) {
  const { externalPath, iconType, isSelected, name } = props;
  const router = useRouter();

  const handleClick = () => {
    if (isSelected && !router.query.detailsHash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <style jsx>{`
        a.MenuBottomMobileItem {
          display: flex;
          width: 100%;
          height: 100%;
          font-size: 10px;
          line-height: 14px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: ${isSelected ? MOBILE_TEXT : BOTTOM_MENU_GREY};
          font-weight: ${FONT_WEIGHT_TITLE};
        }
      `}</style>
      {externalPath ? (
        <a
          className="MenuBottomMobileItem"
          href={externalPath}
          onClick={handleClick}
          rel="noreferrer noopener"
          target="_blank"
        >
          {ICON[iconType]}
          <span>{name}</span>
        </a>
      ) : (
        <Link href={`/${name.toLowerCase()}`}>
          <a className="MenuBottomMobileItem" onClick={handleClick}>
            {ICON[iconType]}
            <span>{name}</span>
          </a>
        </Link>
      )}
    </>
  );
}

export default MenuBottomMobileItem;
