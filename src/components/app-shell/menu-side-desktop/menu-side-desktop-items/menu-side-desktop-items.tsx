import Link from 'next/link';
import React from 'react';

import { AccountInfoStatus } from 'components/app-shell/header-desktop/account-info/account-info-status';
import { ICON } from 'components/svg';
import { StatusConnect } from 'components/widgets/account-info-status';
import {
  BUTTON_GREY,
  FONT_WEIGHT_TEXT,
  FONT_WEIGHT_TITLE,
  GREY,
  HOVER_LINK_GREY,
  WHITE,
} from 'data/data-style';
import { IMenuItem } from 'models/models-side-menu';

import { NodeStatusIndicator } from './menu-node-status-indicator';

interface Props extends IMenuItem {
  isSelected: boolean;
}

function MenuSideDesktopItems(props: Props) {
  const { externalPath, iconType, isSelected, name } = props;
  const href = externalPath || `/${name.toLowerCase()}`;
  const isStatus = name === 'Status';

  return (
    <>
      <style jsx>{`
        a.MenuSideDesktopItem {
          display: flex;
          width: calc(100% - 28px);
          height: 48px;
          font-size: 14px;
          padding-left: 28px;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          color: ${GREY};
          opacity: ${isSelected ? 1 : 0.6};
          background-color: ${isSelected ? BUTTON_GREY : 'transparent'};
          font-weight: ${isSelected ? FONT_WEIGHT_TITLE : FONT_WEIGHT_TEXT};
        }
        a.MenuSideDesktopItem:hover {
          background-color: ${HOVER_LINK_GREY};
          opacity: 1;
        }
        a.MenuSideDesktopItem:active {
          background-color: ${BUTTON_GREY};
          opacity: 1;
        }
        .status-block {
          position: relative;
          display: inline-block;
        }
        a .status-content {
          display: none;
          visibility: visible;
          width: 180px;
          text-align: center;
          padding: 5px 0;
          border-radius: 2px;
          z-index: 1;
          position: absolute;
          bottom: 150%;
          left: -105%;
          background-color: ${WHITE};
          box-shadow: 0px 2px 10px 0 rgba(50, 64, 77, 0.1);
        }
        .MenuSideDesktopItem.Status:hover .status-content {
          visibility: visible;
          display: inline-block;
          position: absolute;
        }
        span {
          margin-left: 28px;
        }
      `}</style>
      {externalPath ? (
        <a
          className={isStatus ? 'MenuSideDesktopItem Status' : 'MenuSideDesktopItem'}
          href={href}
          rel="noreferrer noopener"
          target={isStatus ? undefined : '_blank'}
        >
          {ICON[iconType]}
          <span className="status-block">
            {name}
            {isStatus && (
              <>
                <StatusConnect
                  render={(nodeDetails) => <NodeStatusIndicator status={nodeDetails.status} />}
                />
                <span className="status-content">
                  <StatusConnect
                    render={(nodeDetails) => (
                      <AccountInfoStatus
                        status={nodeDetails.status}
                        latestBlock={nodeDetails.latestBlock}
                        latestIndexedBlock={nodeDetails.latestIndexedBlock}
                      />
                    )}
                  />
                </span>
              </>
            )}
          </span>
        </a>
      ) : (
        <Link href={href}>
          <a className="MenuSideDesktopItem">
            {ICON[iconType]}
            <span>{name}</span>
          </a>
        </Link>
      )}
    </>
  );
}

export default MenuSideDesktopItems;
