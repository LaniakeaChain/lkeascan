import React, { useEffect, useState } from 'react';

import { API_AUTHORITY } from 'data/data-fetch';
import { MOBILE_TEXT } from 'data/data-style';
import { Authentication } from 'utils/api/auth';

export function AccountInfoLogoutButton() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(new Authentication());
  }, []);

  if (API_AUTHORITY && auth) {
    return (
      <>
        <style jsx>{`
          div.AccountInfoLogoutButton {
            display: flex;
            align-items: center;
            position: relative;
            width: 100%;
            height: 64px;
          }
          button {
            padding: 8px 16px;
            color: ${MOBILE_TEXT};
            line-height: 16px;
            font-size: 14px;
            text-align: left;
            white-space: nowrap;
            height: 32px;
            width: 100%;
          }
        `}</style>
        <div className="AccountInfoLogoutButton">
          <button className="--interactions" onClick={() => auth.logout()}>
            Log out
          </button>
        </div>
      </>
    );
  } else {
    return null;
  }
}
