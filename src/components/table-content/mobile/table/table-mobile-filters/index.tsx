import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { MOBILE_LIGHT_GREY, MOBILE_TEXT } from 'data/data-style';
import { IHeaderItem } from 'models/models-data-general';
import { IDictionary } from 'models/models-general';
import {
  EHeaderIconType,
  IMultiFilterConfig,
  ISortConfig,
  ISortValues,
} from 'models/models-table-general';
import { useTimeout } from 'utils/use-timeout';
import { defined } from 'utils/variable-evaluation';
import { bodyScroll } from 'utils/viewport';

import { TableMobileModal } from './table-mobile-modal';

let lastScrollY;

function numberOfFilters(currentFilters: IDictionary<any[]>) {
  return Object.keys(currentFilters).reduce((a: number, c: string) => {
    if (currentFilters[c].length > 0 && currentFilters[c].some((item) => defined(item))) {
      a++;
    }

    return a;
  }, 0);
}

export enum EFilterType {
  Filter = 'Filter',
  Sort = 'Sort',
}

export interface IResetFilterConfig {
  resetFilterBy: any;
  resetSortBy: ISortValues;
}

interface ITableMobileFiltersProps {
  filterConfig: IMultiFilterConfig;
  filters: IDictionary<IHeaderItem[]>;
  sortRowsConfig?: ISortConfig;
}

export function TableMobileFilters({
  filterConfig,
  filters,
  sortRowsConfig,
}: ITableMobileFiltersProps) {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [resetFilterConfig, setResetFilter] = useState(null);

  let numberOfFiltersSet = 0;

  if (defined(filterConfig)) {
    numberOfFiltersSet = numberOfFilters(filterConfig.currentFilters);
  }

  useEffect(() => {
    let resetSortBy = {};

    if (defined(sortRowsConfig)) {
      const { direction, sort } = sortRowsConfig;
      resetSortBy = { sort, direction };
    }

    setResetFilter({ resetSortBy, resetFilterBy: {} });
  }, [sortRowsConfig]);

  const [onNextTick] = useTimeout(0);

  return (
    <>
      <style jsx>{`
        div.TableMobileFilters {
          display: flex;
          justify-content: center;
          flex-direction: row;
        }
        button.filter {
          font-size: 14px;
          line-height: 16px;
          color: ${MOBILE_TEXT};
          padding: 16px;
        }
        div.line {
          width: 1px;
          height: 16px;
          margin-top: 16px;
          background-color: ${MOBILE_LIGHT_GREY};
        }
        button.filter:first-child {
          padding: 16px 16px 16px 0;
          border-left: none;
        }
      `}</style>
      <>
        {defined(selectedFilter) &&
          createPortal(
            <TableMobileModal
              selectedFilter={selectedFilter}
              resetFilterConfig={resetFilterConfig}
              filters={filters}
              filterConfig={filterConfig}
              sortRowsConfig={sortRowsConfig}
              onCloseModal={() => {
                setSelectedFilter(null);
                onNextTick(() => window.scrollTo(0, lastScrollY));
              }}
            />,
            document.body,
          )}
        <div className="TableMobileFilters">
          {defined(filterConfig) && (
            <>
              <button
                className="filter"
                onClick={() => {
                  setSelectedFilter(EFilterType.Filter);
                  lastScrollY = bodyScroll();
                }}
              >
                <span>{`Filters (${numberOfFiltersSet})`}</span>
              </button>
              <div className="line" />
            </>
          )}
          {filters &&
            filters[EHeaderIconType.Sort] &&
            sortRowsConfig &&
            sortRowsConfig.onSortChange && (
              <button
                className="filter"
                onClick={() => {
                  setSelectedFilter(EFilterType.Sort);
                  lastScrollY = bodyScroll();
                }}
              >
                <span>Sort</span>
              </button>
            )}
        </div>
      </>
    </>
  );
}
