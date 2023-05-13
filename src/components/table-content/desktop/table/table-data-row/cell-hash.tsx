import React from 'react';

import { ILinkConfig } from 'models/models-data-general';
import { ILinkItem } from 'models/models-general';

import { ArrowRightIcon } from './arrow-right-icon';
import { CellContractIcon } from './cell-contract-icon';
import { ToolTipCellCopy } from './cell-tool-tip-copy';

import { ROW_HEIGHT } from './index';

interface Props {
  allLinks?: ILinkItem[];
  children: string;
  contentToCopy: string;
  isContract?: boolean;
  isToHash?: boolean;
  linkConfig?: ILinkConfig;
}

export function CellHash({
  allLinks,
  children,
  contentToCopy,
  isContract,
  isToHash,
  linkConfig,
}: Props) {
  return (
    <>
      <style jsx>{`
        div.CellHash {
          position: relative;
          height: ${ROW_HEIGHT - 3}px;
          width: 100%;
        }
      `}</style>
      <div className="CellHash">
        {isToHash && <ArrowRightIcon />}
        {isContract && <CellContractIcon />}
        <ToolTipCellCopy linkConfig={linkConfig} contentToCopy={contentToCopy} links={allLinks}>
          {children}
        </ToolTipCellCopy>
      </div>
    </>
  );
}
