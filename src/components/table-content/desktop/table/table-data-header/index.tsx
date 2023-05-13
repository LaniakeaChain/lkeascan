import React from 'react';

import { EDisplayTitleType, IHeaderItem } from 'models/models-data-general';

import { TableHeaderCell } from './table-header-cell';

interface Props {
  displayTitleType: EDisplayTitleType;
  items: IHeaderItem[];
}

export function TableHeader({ displayTitleType, items }: Props) {
  const isTab = displayTitleType === EDisplayTitleType.Tab;

  return (
    <thead className="TableHeader">
      <tr style={{ height: isTab ? 44 : 60 }}>
        {items.map((item: IHeaderItem) => (
          <TableHeaderCell key={item.headerType} isTab={isTab} headerType={item.headerType} />
        ))}
      </tr>
    </thead>
  );
}
