import Link from 'next/link';
import React from 'react';

import {
  DASHBOARD_LINE,
  DESKTOP_WIDTH,
  MOBILE_GREY_TEXT,
  MOBILE_TEXT,
  TABLET_WIDTH,
} from 'data/data-style';
import { formatIntegersWithComma } from 'utils/format';

interface DashboardItemProps {
  href: string;
  label: string;
  value: number;
  isLast?: boolean;
}

const DashboardItem = ({ href, isLast, label, value }: DashboardItemProps) => (
  <>
    <style jsx>{`
      a.link {
        position: relative;
        width: 100%;
        height: 64px;
        margin-top: 32px;
        text-align: left;
        display: block;
      }

      a.link:first-child {
        margin-top: 0;
      }

      div.name {
        margin-top: 8px;
        color: ${MOBILE_GREY_TEXT};
        font-size: 12px;
        line-height: 16px;
      }

      div.number {
        color: ${MOBILE_TEXT};
        font-weight: 500;
        font-size: 32px;
        line-height: 40px;
      }

      div.line {
        display: none;
      }

      @media (min-width: ${TABLET_WIDTH}px) {
        a.link {
          width: 50%;
        }

        a.link:nth-child(2) {
          margin-top: 0;
        }
      }

      @media (min-width: ${DESKTOP_WIDTH}px) {
        div.name {
          margin-top: 4px;
        }

        a.link {
          height: 100%;
          width: 33%;
          margin-top: 0;
          text-align: center;
        }

        div.number {
          font-weight: 600;
          font-size: 36px;
          line-height: 44px;
        }

        div.line {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          width: 1px;
          height: 100%;
          background-color: ${DASHBOARD_LINE};
        }
      }
    `}</style>
    <Link href={href} passHref>
      <a className="link">
        <div className="number">{formatIntegersWithComma(value)}</div>
        <div className="name">{label}</div>
        {isLast ? null : <div className="line" />}
      </a>
    </Link>
  </>
);

export default DashboardItem;
