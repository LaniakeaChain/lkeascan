import React from 'react';

import { defined } from 'utils/variable-evaluation';

import { IDetailsContentProps } from '..';

import { MobileDetailsHighlight } from './mobile-details-highlight';
import { MobileDetailsOverview } from './mobile-details-overview';
import { MobileDetailsTable } from './mobile-details-table';

export function DetailsMobile(props: IDetailsContentProps) {
  const { highlightConfig, overviewConfig, table } = props;
  const isHighlight = defined(highlightConfig);
  return (
    <>
      <style jsx>{`
        div.DetailsMobile {
          width: 100%;
          margin-top: 32px;
        }
      `}</style>
      <div className="DetailsMobile">
        <MobileDetailsOverview config={overviewConfig} />
        {isHighlight && <MobileDetailsHighlight {...highlightConfig} />}
        {table && <MobileDetailsTable>{table}</MobileDetailsTable>}
      </div>
    </>
  );
}
