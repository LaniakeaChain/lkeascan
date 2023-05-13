import React from 'react';

import { CellHash } from 'components/table-content/desktop/table/table-data-row/cell-hash';
import { ToolTipCell } from 'components/table-content/desktop/table/table-data-row/cell-tool-tip';
import { ToolTipCellCopy } from 'components/table-content/desktop/table/table-data-row/cell-tool-tip-copy';
import { TextLink } from 'components/table-content/desktop/table/table-data-row/text-link';
import { TextOnly } from 'components/table-content/desktop/table/table-data-row/text-only';
import { InlineHash } from 'components/table-content/mobile/table/table-mobile-item/inline-hash';
import { TextTruncate } from 'components/text-truncate';
import { FunctionMetaParameterModal } from 'components/widgets/parameter-modal';
import { NO_META_TEXT } from 'data/data-style';
import { ELinkType } from 'models/models-general';
import { IContractsData } from 'models/models-table-contracts';
import { IEventsData } from 'models/models-table-events';
import { IInternalTransactionsData, ITransactionsData } from 'models/models-table-transactions';
import { formatHash } from 'utils/format';
import { resolveLink } from 'utils/navigation';
import { defined, isHash } from 'utils/variable-evaluation';

export const resolveName = (data: IContractsData, isMobile?: boolean) => {
  const link = resolveLink(data.links, ELinkType.Metadata);

  if (link && link.href) {
    if (link.display) {
      if (isMobile) {
        return (
          <InlineHash contentToCopy={link.display} linkConfig={{ href: link.href }}>
            {link.display}
          </InlineHash>
        );
      } else {
        return (
          <CellHash linkConfig={{ href: link.href }} contentToCopy={link.display}>
            {link.display}
          </CellHash>
        );
      }
    } else {
      return <TextLink href={link.href}>View</TextLink>;
    }
  } else {
    if (isMobile) {
      return <TextTruncate style={{ color: NO_META_TEXT }}>No metadata</TextTruncate>;
    } else {
      return <TextOnly style={{ color: NO_META_TEXT }}>No metadata</TextOnly>;
    }
  }
};

export const renderEventsData = (data: IEventsData) => {
  if (isHash(data.eventName)) {
    return (
      <ToolTipCellCopy textStyle={{ color: '#434343' }} contentToCopy={data.eventName}>
        {formatHash(data.eventName)}
      </ToolTipCellCopy>
    );
  } else {
    return <TextOnly style={{ color: '#434343' }}>{data.eventName}</TextOnly>;
  }
};

export const renderFunctionCell = (data: ITransactionsData | IInternalTransactionsData) => {
  if (defined(data.functionMeta)) {
    if (data.functionMeta.params && data.functionMeta.params.length > 0) {
      return (
        <ToolTipCell
          toolTipContent={<FunctionMetaParameterModal parameters={data.functionMeta.params} />}
        >
          <TextOnly style={{ cursor: 'pointer' }} isToolTip>
            {data.functionMeta.functionName}
          </TextOnly>
        </ToolTipCell>
      );
    } else {
      return <TextOnly>{data.functionMeta.functionName}</TextOnly>;
    }
  } else if ((data.transactionType as String) === 'ContractCreation') {
    return <TextOnly style={{ color: '#C7C7C7' }}>create</TextOnly>;
  } else if (data.transactionType === 'Transfer') {
    return <TextOnly style={{ color: '#C7C7C7' }}>send</TextOnly>;
  } else if ((data.transactionType as String) === 'ContractCall' && data.ethValue !== '0.0') {
    return <TextOnly style={{ color: '#C7C7C7' }}>send</TextOnly>;
  } else {
    return <TextOnly style={{ color: '#C7C7C7' }}>unknown</TextOnly>;
  }
};

export const renderFunctionInline = (data: ITransactionsData | IInternalTransactionsData) => {
  if (defined(data.functionMeta)) {
    return <TextTruncate isToolTipDisabled>{data.functionMeta.functionName}</TextTruncate>;
  } else {
    return (
      <TextOnly
        style={{
          color: '#C7C7C7',
          fontSize: 14,
          lineHeight: '20px',
        }}
      >
        Unknown
      </TextOnly>
    );
  }
};
