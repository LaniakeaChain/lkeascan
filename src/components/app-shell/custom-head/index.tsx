import Head from 'next/head';
import React from 'react';

import { IHeadMeta } from 'models/models-general';
import { themedHead } from 'theming';
// import { usePageTitle } from 'utils/page-title';

const meta = themedHead();

export const CustomHead = () => {
  const { description, favicon, logo, title, url }: IHeadMeta = meta;
  // const dynamicTitle = usePageTitle().title;

  const renderFavicon = () => {
    if (typeof favicon === 'string') {
      return <link rel="icon" href={favicon} />;
    } else {
      return (
        <>
          {Object.keys(favicon).map((size: string) => (
            <link
              key={size}
              rel="icon"
              type="image/png"
              sizes={`${size}x${size}`}
              href={favicon[size]}
            />
          ))}
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:image" content={logo} />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        {renderFavicon()}
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#FFF" />
        {/*<link rel="manifest" href="/static/manifest.webmanifest" />*/}
        {/*<meta property="og:image" content="/static/logo.png" />*/}
        <meta property="og:title" content={title} />
        {/*<meta property="og:url" content="http://epirus.com" />*/}
        {/*<meta property="og:image" content="/static/logo.png" />*/}
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        {/*<meta property="fb:app_id" content="" />*/}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0" />
        <link rel="stylesheet" href="https://use.typekit.net/odh5jwh.css" />
        {/* Request "Usual"
       font />*/}
        {/*<link rel="shortcut icon" href="/static/favicon.ico" />*/}
      </Head>
    </>
  );
};
