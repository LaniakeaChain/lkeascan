import React from 'react';

import { DESKTOP_WIDTH, PAGINATION_GREY } from 'data/data-style';
import { IPaging } from 'models/models-data-general';
import { IPageNumberConfig, IRowsDisplayedConfig } from 'models/models-table-general';

import { ArrowsPaginationNav } from './arrows-pagination-nav';
import { RowsDisplayedInfo } from './rows-displayed-info';
import { RowsSelecter } from './rows-selecter';

export interface ITablePaginationProps {
  isMobile?: boolean;
  pageNumberConfig: IPageNumberConfig;
  paging: IPaging;
  rowsDisplayedConfig: IRowsDisplayedConfig;
}

export function TablePagination({
  isMobile,
  pageNumberConfig,
  paging,
  rowsDisplayedConfig,
}: ITablePaginationProps) {
  const { onPageNumberChange } = pageNumberConfig;
  const { onRowsDisplayedChange } = rowsDisplayedConfig;
  const { totalElements, totalPages } = paging;

  const pageFromConfig: any = pageNumberConfig.page;
  const pageFromPaging = paging.page;
  const page = parseFloat(pageFromConfig) || pageFromPaging;

  const sizeFromConfig: any = rowsDisplayedConfig.size;
  const sizeFromPaging = paging.size;
  const size = parseFloat(sizeFromConfig) || sizeFromPaging;

  const isArrows = paging.totalElements > paging.size;

  const isRowsSelecter = totalElements > 10;

  return (
    <>
      <style jsx>{`
        div.TablePagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 500;
          flex-direction: row;
          color: ${PAGINATION_GREY};
          margin: ${isMobile ? '32px 0 102px 0' : 0};
          width: 100%;
        }
        div.pagination-control {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: center;
          width: auto;
        }
        @media (max-width: ${DESKTOP_WIDTH}px) {
          div.TablePagination {
            align-items: flex-start;
            flex-direction: column;
            color: ${PAGINATION_GREY};
          }
          div.pagination-control {
            margin-top: ${isRowsSelecter ? 12 : 0}px;
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
      <div className="TablePagination">
        {isRowsSelecter && <RowsSelecter value={size} onChange={onRowsDisplayedChange} />}
        <div className="pagination-control">
          {totalElements !== 0 && (
            <RowsDisplayedInfo
              min={page * size + 1}
              max={Math.min((page + 1) * size, totalElements)}
              totalRows={totalElements}
              isArrows={isArrows}
            />
          )}
          {isArrows && (
            <ArrowsPaginationNav
              totalPages={totalPages}
              currentPage={page}
              onPageNumberChange={onPageNumberChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
