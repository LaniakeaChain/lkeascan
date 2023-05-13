import 'react-dates/initialize';
import React, { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import { PageTitleContextProvider } from 'utils/page-title';

import { IsFirstAppRenderContextProvider } from '../utils/is-first-render';

export default function Epirus({ Component, pageProps }) {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <React.StrictMode>
      <IsFirstAppRenderContextProvider>
        <PageTitleContextProvider>
          <Component {...pageProps} />
        </PageTitleContextProvider>
      </IsFirstAppRenderContextProvider>
    </React.StrictMode>
  );
}
