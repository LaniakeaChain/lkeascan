import React, { useEffect, useState } from 'react';

import { API_AUTHORITY } from 'data/data-fetch';
import { ACTIVE_BUTTON_GREY, DESKTOP_WIDTH, MOBILE_SMALL_WIDTH } from 'data/data-style';
import { Authentication } from 'utils/api/auth';

export function ProfileLogout() {
  const [auth, setAuth] = useState(null);
  const isMetadataRegistryLink = process.env.ENABLE_PAID_FEATURES === 'enabled';

  useEffect(() => {
    setAuth(new Authentication());
  }, []);

  if (auth && API_AUTHORITY) {
    return (
      <>
        <style jsx>{`
          div.line-divider {
            position: relative;
            left: 0;
            background-color: #e4e6e9;
            height: 1px;
            width: calc(100% + 48px);
            margin-top: ${isMetadataRegistryLink ? 0 : 16}px;
          }
          div.log-out {
            position: relative;
            left: 0;
            width: calc(100% + 48px);
          }
          div.log-out button {
            padding: 8px 24px;
            margin: 8px 0;
            font-size: 14px;
            line-height: 16px;
            text-align: left;
            width: 100%;
          }
          @media (max-width: ${DESKTOP_WIDTH}px) {
            div.log-out button:hover {
              background-color: ${ACTIVE_BUTTON_GREY};
            }
          }
          @media (max-width: ${MOBILE_SMALL_WIDTH}px) {
            div.line-divider {
              width: calc(100% + 40px);
            }
            div.log-out {
              width: calc(100% + 40px);
            }
            div.log-out button {
              padding: 8px 20px;
            }
          }
        `}</style>
        <>
          <div className="line-divider" />
          <div className="log-out --interactions">
            <button onClick={() => auth.logout()}>Log out</button>
          </div>
        </>
      </>
    );
  } else {
    return null;
  }
}
