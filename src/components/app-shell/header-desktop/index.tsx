import Link from 'next/link';
import React from 'react';

import { HEADER_ENV_LABEL_COLOR, HEADER_HEIGHT, MIN_CONTENT_WIDTH, WHITE } from 'data/data-style';
import { themed } from 'theming';

import { HeaderDesktopRightContent, IHeaderDesktopRightContentProps } from './right-content';

export function HeaderDesktop(props: IHeaderDesktopRightContentProps) {
  const logoUrl = themed('logo');
  const palette = themed('palette');
  const envLabel = themed('headerEnvLabel');

  /** TODO: Get remote theming properly (i.e. load all props at start)
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    fetchData('/configuration/frontend').then((res) => {
      if (res.logoUrl) {
        setLogoUrl(res.logoUrl !== 'default' ? res.logoUrl : themed('logo'));
      } else {
        setLogoUrl(themed('logo'));
      }
    });
  }, []);*/

  return (
    <>
      <style jsx>{`
        header {
          position: relative;
          height: ${HEADER_HEIGHT}px;
          width: 100%;
          background-color: ${palette.header.background};
          z-index: 999;
          /* This is to keep header above the table */
          /* Assumes max table rows are less than 999 */
        }
        h1 {
          line-height: 24px;
          font-size: 20px;
          font-weight: 500;
          color: ${WHITE};
          letter-spacing: 7px;
        }
        div.container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          margin-right: auto;
          margin-left: auto;
        }
        a.logo {
          display: flex;
          width: 215px;
          height: ${HEADER_HEIGHT}px;
          margin-left: 0px;
        }
        a.logo img {
          object-fit: contain;
          width: 100%;
          height: 60%;
          margin-top: 15px;
          margin-right: 5px;
        }
        @media (min-width: ${MIN_CONTENT_WIDTH}px) {
          div.container {
            width: ${MIN_CONTENT_WIDTH}px;
          }
        }
        a.logo span.env-label {
          background-color: #f5f5f5;
          border-radius: 6px;
          padding: 3px;
          margin-bottom: 17%;
          margin-top: 8%;
          font-size: 10px;
          color: ${HEADER_ENV_LABEL_COLOR};
        }
      `}</style>
      <header>
        <div className="container">
          <Link href="/">
            <a className="logo">
              {logoUrl !== null && <img src={logoUrl} alt="Logo" />}{' '}
              {envLabel && <span className="env-label">{themed('headerEnvLabel')}</span>}
            </a>
          </Link>
          <HeaderDesktopRightContent {...props} />
        </div>
      </header>
    </>
  );
}
