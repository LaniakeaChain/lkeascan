import { ethers } from 'ethers';
import React from 'react';

import { TextViewerWrapper } from 'components/inputs/text-viewer-modal';
import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IDetailsHighlightProps, IOverviewContentProps } from 'models/models-details-general';
import { ETagType } from 'models/models-tags';
import { themed } from 'theming';
import {
  formatDateDiffFromNow,
  formatHash,
  formatHashLong,
  formatNativeToDecimals,
  formatWithCommas,
} from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { isHash } from 'utils/variable-evaluation';

const currency = themed('currency');

const txStatus = {
  '0x0': 'Failed',
  '0x1': 'Succeeded',
  '0x2': 'Invalid',
};

export function transactionOverviewConfig(data, isDesktop: boolean): IOverviewContentProps {
  const {
    blockHash,
    blockNumber,
    ethValue,
    from,
    fromLinks,
    gas,
    gasPrice,
    gasUsed,
    hash,
    input,
    isPrivate,
    nonce,
    revertReason,
    status,
    timestampISO,
    to,
    toLinks,
    transactionIndex,
    transactionType,
    value,
  } = data;

  const fromToDisplay = getOptimalLink(['token', 'contract', 'account'], fromLinks);
  const toToDisplay = getOptimalLink(['token', 'contract', 'account'], toLinks);
  const txFee = ethers.BigNumber.from(gasPrice).mul(ethers.BigNumber.from(gasUsed));
  const isFailed = status !== '0x1';

  const statusInfo = [
    [
      {
        name: 'Status',
        value: (status && txStatus[status]) || '',
      },
    ],
  ];

  if (isFailed && revertReason) {
    statusInfo.push([
      {
        name: 'Reason',
        value: revertReason,
      },
    ]);
  }

  return {
    titleConfig: {
      label: 'Transaction Details',
      tag: ETagType[transactionType],
      error: isFailed,
      isPrivate,
    },
    subtitleConfig: {
      value: hash,
      label: isDesktop ? formatHashLong(hash) : formatHash(hash),
      isNoRenameIcon: true,
      copyText: 'Copy transaction hash',
    },
    info: [
      ...statusInfo,
      [
        {
          name: 'From',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={from}
              linkConfig={{
                ...fromToDisplay.nextLinkConfig,
              }}
            >
              {isHash(fromToDisplay.display)
                ? formatHash(fromToDisplay.display)
                : fromToDisplay.display}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'To',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14 }}
              contentToCopy={to}
              linkConfig={{
                ...toToDisplay.nextLinkConfig,
              }}
            >
              {isHash(toToDisplay.display) ? formatHash(toToDisplay.display) : toToDisplay.display}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Block',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 12 }}
              contentToCopy={blockNumber.toString()}
              linkConfig={{
                href: `/blocks/[detailsHash]`,
                as: `/blocks/${blockHash}`,
              }}
            >
              {`#${blockNumber}`}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'Time',
          value: formatDateDiffFromNow(timestampISO),
        },
      ],
    ],
    additionalDetails: [
      [
        {
          name: 'Input Bytecode',
          value: <TextViewerWrapper title="Input Bytecode">{input}</TextViewerWrapper>,
        },
      ],
      [
        {
          name: 'Value',
          value: `${formatNativeToDecimals(ethValue)} ${currency} / ${formatWithCommas(
            value,
            0,
            0,
          )} ${themed('smallCurrency')}`,
        },
      ],
      [
        {
          name: 'Transaction Fee',
          value: `${ethers.utils.formatUnits(txFee, themed('decimals'))} ${themed('currency')}`,
        },
      ],
      [
        {
          name: 'Gas Limit & Usage',
          value: `${formatWithCommas(gas, 0, 0)} | ${formatWithCommas(gasUsed, 0, 0)} (${(
            (gasUsed * 100) /
            gas
          ).toFixed(2)}%)`,
        },
      ],
      [
        {
          name: 'Gas Price',
          value: `${ethers.utils.formatUnits(gasPrice, themed('decimals'))} ${themed('currency')}`,
        },
      ],
      [
        {
          name: 'Position',
          value: transactionIndex.toString(),
        },
        nonce && {
          name: 'Nonce',
          value: nonce,
        },
      ],
    ],
  };
}

export function transactionsHighlightConfig(ethValue): IDetailsHighlightProps {
  return {
    style: { height: `calc(298px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Value',
    value: formatNativeToDecimals(ethValue),
    unit: currency,
    tooltipContentToCopy: `${formatNativeToDecimals(ethValue)} ${currency}`,
  };
}
