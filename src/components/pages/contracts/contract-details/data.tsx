import React from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { EFetchState, IFetchDataState } from 'models/models-async';
import { IContractDetailsFetch } from 'models/models-details-contracts';
import { IDetailsHighlightProps, IOverviewContentProps } from 'models/models-details-general';
import { ELinkType } from 'models/models-general';
import { IMetadataData } from 'models/models-table-metadata';
import { themed } from 'theming';
import { formatHash, formatNativeToDecimals, formatWithCommas } from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { resolveLink } from 'utils/navigation';
import { isHash } from 'utils/variable-evaluation';

import { InlineUploadButton } from './inline-upload-button';

const currency = themed('currency');

function metadata(links): IFetchDataState<IMetadataData> {
  const metaLink = resolveLink(links, ELinkType.Metadata);

  if (metaLink) {
    return {
      fetchState: EFetchState.Success,
      data: {
        links,
        name: metaLink.display,
        fileId: null,
      },
    };
  } else {
    return {
      fetchState: EFetchState.None,
    };
  }
}

export function contractOverviewConfig(data, isDesktop): IOverviewContentProps {
  const {
    balance,
    contractAddress,
    contractCreator,
    contractType,
    createdBlockHash,
    createdBlockNumber,
    createdTransactionHash,
    display,
    ethBalance,
    links,
  }: IContractDetailsFetch = data;

  const info = [
    [
      {
        name: 'Created at block',
        value: (
          <ToolTipContentInline
            textStyle={{ fontSize: 14 }}
            contentToCopy={createdBlockNumber.toString()}
            linkConfig={{
              href: `/blocks/[detailsHash]`,
              as: `/blocks/${createdBlockHash}`,
            }}
          >
            {`#${createdBlockNumber}`}
          </ToolTipContentInline>
        ),
      },
      {
        name: 'On',
        value: (
          <ToolTipContentInline
            textStyle={{ fontSize: 14 }}
            contentToCopy={createdTransactionHash} // should be createdTransaction, TODO change when value is available
            linkConfig={{
              href: `/transactions/[detailsHash]`,
              as: `/transactions/${createdTransactionHash}`,
            }}
          >
            {formatHash(createdTransactionHash)}
          </ToolTipContentInline>
        ),
      },
      {
        name: 'By',
        value: (
          <ToolTipContentInline
            textStyle={{ fontSize: 14 }}
            contentToCopy={contractCreator}
            linkConfig={{
              href: `/accounts/[detailsHash]`,
              as: `/accounts/${contractCreator}`,
            }}
          >
            {formatHash(contractCreator)}
          </ToolTipContentInline>
        ),
      },
    ],
  ];

  if (contractType?.toLowerCase() !== 'custom') {
    const tokenLink = getOptimalLink(['token', 'contract', 'account'], links);

    info.push([
      {
        name: 'Token',
        value: (
          <ToolTipContentInline
            textStyle={{ fontSize: 14 }}
            contentToCopy={contractAddress}
            linkConfig={{
              href: `/tokens/[detailsHash]`,
              as: `/tokens/${contractAddress}`,
            }}
          >
            {isHash(tokenLink.display) ? formatHash(tokenLink.display) : tokenLink.display}
          </ToolTipContentInline>
        ),
      },
    ]);
  }

  return {
    titleConfig: {
      label: 'Contract Details',
      tag: contractType,
    },
    subtitleConfig: {
      value: contractAddress.toString(),
      label: isDesktop ? contractAddress.toString() : formatHash(contractAddress),
      display: display,
    },
    info,
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
      [
        process.env.ENABLE_PAID_FEATURES === 'enabled'
          ? {
              name: 'Contract Metadata',
              value: <InlineUploadButton initialFetchDataState={metadata(links)} />,
            }
          : null,
      ],
    ],
  };
}

export function contractHighlightConfig(ethValue: string): IDetailsHighlightProps {
  return {
    style: { height: `calc(266px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Balance',
    value: formatNativeToDecimals(ethValue),
    unit: currency,
    tooltipContentToCopy: `${formatNativeToDecimals(ethValue)} ${currency}`,
  };
}
