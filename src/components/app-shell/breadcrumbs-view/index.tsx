import React, { CSSProperties } from 'react';

import { INameValuePair } from 'models/models-general';

import { Breadcrumbs } from './breadcrumbs';

interface Props {
  inlineStyle?: CSSProperties;
  breadcrumbs: INameValuePair[];
  children: JSX.Element | JSX.Element[];
}

export function BreadcrumbsView(props: Props) {
  const { breadcrumbs, children, inlineStyle } = props;

  return (
    <>
      <style jsx>{`
        div.BreadcrumbsView {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <div style={inlineStyle} className="BreadcrumbsView">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {children}
      </div>
    </>
  );
}
