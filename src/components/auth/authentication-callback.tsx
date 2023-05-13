import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserManager } from 'oidc-client';
import React from 'react';

import { LoadingSpinner } from 'components/placeholders/loading-spinner';
import { LO_PURPLE, TEXT_GREY } from 'data/data-style';
import { useAsyncEffect } from 'utils/lifecycles';

function AuthenticationCallback() {
  const router = useRouter();

  useAsyncEffect(async () => {
    const mgr = new UserManager({
      loadUserInfo: true,
      filterProtocolClaims: true,
    });

    try {
      await mgr.signinRedirectCallback();
    } catch (e) {
      // do nothing
    }

    window.location.href = (router.query.url as string) || '/';
  }, []);

  return (
    <>
      <style jsx>{`
        div.Authenticating {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 100%;
          height: calc(100% - 100px);
          padding: 50px 0;
        }
        div.title {
          display: flex;
          align-items: center;
          flex-direction: row;
          font-size: 22px;
          line-height: 22px;
          color: ${TEXT_GREY};
        }
        span {
          margin-right: 12px;
        }
        a.cancel {
          margin-top: 28px;
          color: ${LO_PURPLE};
        }
      `}</style>
      <div className="Authenticating">
        <div className="title">
          <span>Authenticating...</span>
          <LoadingSpinner style={{ width: 26, height: 26 }} />
        </div>
        <Link href="/">
          <a className="cancel">Cancel</a>
        </Link>
      </div>
    </>
  );
}

export default AuthenticationCallback;
