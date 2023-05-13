import Link from 'next/link';
import React, { Fragment } from 'react';

import { GREY, LIGHT_GREY_SLASH } from 'data/data-style';
import { INameValuePair } from 'models/models-general';
import { defined } from 'utils/variable-evaluation';

interface Props {
  breadcrumbs: INameValuePair[];
}

export function Breadcrumbs(props: Props) {
  return (
    <>
      <style jsx>{`
        div.Breadcrumbs {
          display: flex;
          align-items: center;
          flex-direction: row;
          padding: 0 34px;
          width: calc(100% - 68px);
          height: 60px;
        }
        a.text,
        span.text,
        span.slash {
          color: ${GREY};
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          padding: 0 8px;
        }
        a.text {
          display: inline-block;
        }
        span:last-child {
          margin-right: 0;
        }
        span.slash {
          padding: 0;
          color: ${LIGHT_GREY_SLASH};
          margin: 0 4px;
        }
      `}</style>
      <div className="Breadcrumbs">
        {props.breadcrumbs.map((crumb: INameValuePair, i: number) => {
          const slash = i === 0 ? null : <span className="slash">/</span>;
          return (
            <Fragment key={`${crumb.name} ${i}`}>
              {slash}
              {defined(crumb.value) ? (
                <Link key={`${crumb.name} ${i}`} href={crumb.value}>
                  <a className="text --interactions">{crumb.name}</a>
                </Link>
              ) : (
                <span key={`${crumb.name} ${i}`} className="text">
                  {crumb.name}
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
