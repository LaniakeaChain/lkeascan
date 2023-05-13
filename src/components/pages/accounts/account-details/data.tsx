import React from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IAccountDetailsFetch } from 'models/models-details-accounts';
import { IDetailsHighlightProps } from 'models/models-details-general';
import { themed } from 'theming';
import { formatHash, formatNativeToDecimals, formatWithCommas } from 'utils/format';

const currency = themed('currency');

export function accountOverviewConfig(
  { address, balance, display, ethBalance, links }: IAccountDetailsFetch,
  isDesktop,
) {
  const label = links.find((link) => link.rel === 'account')?.display || display;
  return {
    titleConfig: {
      label: 'Account Details',
    },
    subtitleConfig: {
      value: address,
      label: (isDesktop ? address.toString() : formatHash(address)).replace(/^0x/, 'LK'),
      display: label.replace(/^0x/, 'LK'),
    },
    additionalDetails: [
      [
        {
          name: 'Balance',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 12 }}
              contentToCopy={`${formatWithCommas(balance, 0, 0)} ${themed('smallCurrency')}`}
            >
              {`${formatNativeToDecimals(ethBalance)} ${currency}`}
            </ToolTipContentInline>
          ),
        },
      ],
    ],
  };
}

export function accountHighlightConfig(ethValue: string): IDetailsHighlightProps {
  return {
    style: { height: `calc(222px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Balance',
    value: formatNativeToDecimals(ethValue),
    unit: currency,
    tooltipContentToCopy: `${formatNativeToDecimals(ethValue)} ${currency}`,
  };
}
