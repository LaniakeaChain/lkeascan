import React from 'react';

import { ToolTipContentInline } from 'components/tool-tip/tool-tip-content-inline';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { IDetailsHighlightProps } from 'models/models-details-general';
import { ITokenDetailsFetch } from 'models/models-details-tokens';
import { ETagType } from 'models/models-tags';
import { formatHash, formatWithCommas } from 'utils/format';
import { getOptimalLink } from 'utils/links';
import { resolveTokenName, tokenDetailsTagLookup } from 'utils/tokens';
import { defined, isHash } from 'utils/variable-evaluation';

export function tokenOverviewConfig(tokenDetails: ITokenDetailsFetch) {
  const { address, addressLinks, contractType, decimals, symbol } = tokenDetails;

  const infoSecondLine = [];

  if (defined(symbol)) {
    infoSecondLine.push({
      name: 'Symbol',
      value: symbol,
    });
  }

  if (contractType !== ETagType.ERC721 && defined(decimals)) {
    infoSecondLine.push({
      name: 'Decimals',
      value: decimals.toString(),
    });
  }

  const contractLinkToDisplay = getOptimalLink(['contract', 'account', 'token'], addressLinks);

  return {
    titleConfig: {
      label: 'Token Details',
      tag: tokenDetailsTagLookup(contractType),
    },
    subtitleConfig: {
      value: resolveTokenName(tokenDetails),
      label: resolveTokenName(tokenDetails),
      isNoCopyIcon: true,
      isNoRenameIcon: true,
    },
    info: [
      [
        {
          name: 'Contract Address',
          value: (
            <ToolTipContentInline
              contentToCopy={address}
              linkConfig={{
                href: `/contracts/[detailsHash]`,
                as: `/contracts/${address}`,
              }}
            >
              {isHash(contractLinkToDisplay.display)
                ? formatHash(contractLinkToDisplay.display)
                : contractLinkToDisplay.display}
            </ToolTipContentInline>
          ),
        },
      ],
      infoSecondLine,
    ],
  };
}

export function tokenHighlightConfig(totalSupply: number): IDetailsHighlightProps {
  if (!defined(totalSupply)) {
    return null;
  }

  const value = totalSupply === 0 ? '0' : formatWithCommas(totalSupply);

  return {
    style: { height: `calc(230px - ${MAIN_TABLE_PADDING * 2}px)` },
    title: 'Total Supply',
    value,
    tooltipContentToCopy: defined(totalSupply) ? formatWithCommas(totalSupply) : null,
  };
}
