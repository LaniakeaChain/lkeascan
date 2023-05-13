import React from 'react';

import { ToolTip } from 'components/tool-tip';
import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { ToolTipInline } from 'components/tool-tip/tool-tip-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IBlockDetailsFetch } from 'models/models-details-blocks';
import { IDetailsHighlightProps } from 'models/models-details-general';
import {
  formatDateDiffFromNow,
  formatHash,
  formatIntegersWithComma,
  formatIsoToDayYearMonth,
  formatIsoToHoursMinutesSeconds,
  formatWithCommas,
} from 'utils/format';

export function blockOverviewConfig(fetch: IBlockDetailsFetch, isDesktop: boolean) {
  const {
    difficulty,
    gasLimit,
    gasUsed,
    hash,
    miner,
    nonce,
    parentHash,
    size,
    timestampISO,
    totalDifficulty,
  } = fetch;

  return {
    titleConfig: {
      label: 'Block Details',
    },
    subtitleConfig: {
      value: fetch.number.toString(),
      label: fetch.number.toString(),
      isNoRenameIcon: true,
    },
    info: [
      [
        {
          name: 'Hash',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14, lineHeight: isDesktop ? '22px' : '20px' }}
              contentToCopy={hash}
            >
              {formatHash(hash)}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'Parent Hash',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14, lineHeight: isDesktop ? '22px' : '20px' }}
              contentToCopy={parentHash}
              linkConfig={{
                href: `/blocks/[detailsHash]`,
                as: `/blocks/${parentHash}`,
              }}
            >
              {formatHash(parentHash)}
            </ToolTipContentInline>
          ),
        },
      ],
      [
        {
          name: 'Mined By',
          value: (
            <ToolTipContentInline
              textStyle={{ fontSize: 14, lineHeight: isDesktop ? '22px' : '20px' }}
              contentToCopy={miner}
              linkConfig={{
                href: `/accounts/[detailsHash]`,
                as: `/accounts/${miner}`,
              }}
            >
              {formatHash(miner)}
            </ToolTipContentInline>
          ),
        },
        {
          name: 'Size',
          value: `${formatWithCommas(size)} Bytes`,
        },
        {
          name: 'Time',
          value: (
            <ToolTipInline
              toolTipContent={
                <ToolTip
                  style={{
                    marginTop: 12,
                    flexDirection: 'column',
                  }}
                >
                  <>
                    <span>{formatIsoToDayYearMonth(timestampISO)}</span>
                    <span>{formatIsoToHoursMinutesSeconds(timestampISO)}</span>
                  </>
                </ToolTip>
              }
            >
              <span
                className="time --tooltip"
                style={{ borderBottom: '1px dotted currentColor', paddingBottom: 2 }}
              >
                {formatDateDiffFromNow(timestampISO)}
              </span>
            </ToolTipInline>
          ),
        },
      ],
    ],
    additionalDetails: [
      [
        {
          name: 'Difficulty',
          value: formatWithCommas(difficulty),
        },
      ],
      [
        {
          name: 'Total Difficulty',
          value: formatWithCommas(totalDifficulty),
        },
      ],
      [
        nonce && {
          name: 'Nonce',
          value: nonce,
        },
        {
          name: 'Gas Limit',
          value: formatWithCommas(gasLimit),
        },
        {
          name: 'Gas Used',
          value: formatWithCommas(gasUsed),
        },
      ],
    ],
  };
}

export function blockHighlightConfig(transactionCount: number): IDetailsHighlightProps {
  return {
    style: { height: `calc(298px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Transaction Count',
    value: formatIntegersWithComma(transactionCount),
  };
}
