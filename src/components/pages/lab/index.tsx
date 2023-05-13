import Link from 'next/link';
import React from 'react';

import { CustomHead } from 'components/app-shell/custom-head';
import { GLOBAL_STYLES } from 'components/app-shell/styles';
import { toPath } from 'utils/format';

const PAGES = [
  'Fonts and Weights',
  'Chart Overflow',
  'Tooltip Animations',
  'Interaction Animations',
];

export const LabPageContent = () => (
  <>
    <CustomHead />
    {GLOBAL_STYLES}
    <style jsx>{`
      div.LabPageContent {
        position: relative;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;
      }
      ul.list {
        list-style: none;
        margin-top: 12px;
        background-color: #fff;
        font-size: 22px;
        line-height: 1.2;
        text-align: center;
        font-family: 'Jura', Arial, sans-serif;
        width: 100%;
        padding: 8px;
        background-color: #424242;
        color: #fff;
        margin-top: 40px;
      }
      li.item {
        font-size: 18px;
        line-height: 19px;
        margin-top: 12px;
      }
      li.item:first-child {
        margin-top: 0;
      }
      a.link {
        text-decoration: none;
        color: #fff;
      }
    `}</style>
    <div className="LabPageContent">
      <ul className="list">
        {PAGES.map((name: string) => (
          <li key={name} className="item">
            <Link href={`/lab/${toPath(name)}`}>
              <a className="link">{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
);
