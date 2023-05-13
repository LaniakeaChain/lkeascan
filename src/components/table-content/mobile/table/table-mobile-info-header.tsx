import React from 'react';

import { DESKTOP_WIDTH, MOBILE_LIGHT_GREY, PAGINATION_GREY } from 'data/data-style';
import { EDisplayTitleType, IHeaderItem, IPaging } from 'models/models-data-general';
import { EPageType } from 'models/models-general';
import { IMultiFilterConfig, ISortConfig } from 'models/models-table-general';
import { numberOfElements } from 'utils/format';
import { headerItemsToFilters } from 'utils/inputs';
import { isEmptyObject } from 'utils/variable-evaluation';

import { TableMobileFilters } from './table-mobile-filters';

interface Props {
  displayTitleType?: EDisplayTitleType;
  filterConfig: IMultiFilterConfig;
  headerItems: IHeaderItem[];
  isZeroElements: boolean;
  paging: IPaging;
  sortRowsConfig?: ISortConfig;
  type: EPageType;
  limit: number;
}

export function TableMobileInfoHeader({
  displayTitleType,
  filterConfig,
  headerItems,
  isZeroElements,
  paging,
  sortRowsConfig,
  limit = -1,
  type,
}: Props) {
  const isTab = EDisplayTitleType.Tab === displayTitleType;
  const filters = headerItemsToFilters(headerItems);
  const isFilters = !isEmptyObject(filters);

  return (
    <>
      <style jsx>{`
        div.TableMobileInfoHeader {
          position: relative;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          margin-top: ${isTab ? -9 : 24}px;
          z-index: 1;
        }
        div.info {
          color: ${PAGINATION_GREY};
          font-size: 14px;
          line-height: 16px;
          margin-bottom: ${isFilters ? 8 : 16}px;
          width: 100%;
          white-space: nowrap;
        }
        div.pagination {
          margin-top: 18px;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.TableMobileInfoHeader {
            margin-top: 32px;
            border-bottom: 1px solid ${MOBILE_LIGHT_GREY};
          }
          div.pagination {
            margin-top: 16px;
          }
        }
      `}</style>
      <div className="TableMobileInfoHeader">
        {!isZeroElements && paging.totalElements > 0 && (
          <div className="info">{numberOfElements(paging.totalElements, type, limit)}</div>
        )}
        {isFilters && (
          <TableMobileFilters
            filters={filters}
            filterConfig={filterConfig}
            sortRowsConfig={sortRowsConfig}
          />
        )}
      </div>
    </>
  );
}
