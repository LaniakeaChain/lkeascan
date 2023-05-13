import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import { StatusConnect } from 'components/widgets/account-info-status';
import { FONT_WEIGHT_TITLE, MIN_CONTENT_WIDTH, MOBILE_SMALL_WIDTH, WHITE } from 'data/data-style';
import { themed } from 'theming';

import { AccountInfoStatus } from '../header-desktop/account-info/account-info-status';
import { NodeStatusIndicator } from '../menu-side-desktop/menu-side-desktop-items/menu-node-status-indicator';

import { resolveDetailsTitle, resolveTitle } from './data';

interface Props {
  isDetails: boolean;
  pageName: string;
}

export function HeaderMobileTop(props: Props) {
  const { isDetails, pageName } = props;
  const title = isDetails ? resolveDetailsTitle(pageName) : resolveTitle(pageName);
  const envLabel = themed('headerEnvLabel');

  return (
    <>
      <style>{`
        div.HeaderMobileTop {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          margin-top: 26px;
          width: 100%;
        }
        div.HeaderMobileTop > * {
          flex: 1 1 0;
        }
        .logo {
          width: 40px;
          height: 40px;
          color: inherit;
          margin-right: 5px;
          margin-bottom: 3px;
        }
        h1.title {
          font-size: 24px;
          line-height: 28px;
          font-weight: ${FONT_WEIGHT_TITLE};
          text-align: center;
        }
        h1.title.isDetails {
          font-size: 16px;
          line-height: 20px;
          max-width: 200px;
        }
        div.logo.--placeholder {
          opacity: 0;
        }
        .logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
          header {
            padding: 0 20px 58px;
            width: calc(100% - 40px);
          }
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.container {
            width: ${MIN_CONTENT_WIDTH - 112}px;
          }
        }

        .node-status-mobile:hover .status-content-mobile {
          opacity: 1;
          display: block;
          background-color: ${WHITE};
        }

        .node-status-mobile {
          position: relative;
          display: inline-block;
          text-align: right;
          text-direction: rtl;
          font-size: 12px;
        }
        .status-content-mobile {
          display: none;
          visibility: visible;
          width: 140px;
          text-align: center;
          padding: 5px 0;
          border-radius: 2px;
          z-index: 1;
          position: absolute;
          left: -205%;
          background-color: ${WHITE};
          box-shadow: 0px 2px 10px 0 rgba(50, 64, 77, 0.1);
        }
        a.header-net {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        a.header-net span.env-label {
          background-color: #F2F2F2;
          color: #999;
          border-radius: 6px;
          padding: 2px 4px;
          font-size: 10px;
        }
      `}</style>
      <div className="HeaderMobileTop">
        <Link href="/">
          <a className="header-net">
            <img className="logo" src={themed('logoFavicon')} alt="Logo" />
            {envLabel && <span className="env-label">{themed('headerEnvLabel')}</span>}
          </a>
        </Link>
        <h1
          className={classNames('title', {
            isDetails: isDetails || pageName === 'Metadata',
          })}
        >
          {title}
        </h1>

        <div className="node-status-mobile">
          Status
          <StatusConnect
            render={(nodeDetails) => <NodeStatusIndicator status={nodeDetails.status} />}
          />
          <span className="status-content-mobile">
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
        </div>
      </div>
    </>
  );
}
