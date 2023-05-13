import React from 'react';

import { DropdownControl } from 'components/inputs/dropdown-control';
import { DropdownContentFilters } from 'components/inputs/dropdown-control/dropdown-content-filters';
import { DropdownContentSectioned } from 'components/inputs/dropdown-control/dropdown-content-sectioned';
import { DropdownWrapper } from 'components/inputs/dropdown-control/dropdown-wrapper';
import { SORT_DIRECTION_LOOKUP, SORT_PLACEHOLDER_LOOKUP } from 'data/data-inputs';
import { MOBILE_TEXT, PAGINATION_GREY } from 'data/data-style';
import {
  EDirectionType,
  EDisplayTitleType,
  IHeaderItem,
  IPaging,
} from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';
import {
  EHeaderIconType,
  IMultiFilterConfig,
  IPageNumberConfig,
  IRowsDisplayedConfig,
  ISortConfig,
} from 'models/models-table-general';
import { numberOfElements } from 'utils/format';

interface Props {
  filters: IDictionary<IHeaderItem[]>;
  displayTitleType?: EDisplayTitleType;
  type: EPageType;
  paging?: IPaging;
  pageNumberConfig: IPageNumberConfig;
  rowsDisplayedConfig: IRowsDisplayedConfig;
  sortRowsConfig: ISortConfig;
  filterConfig: IMultiFilterConfig;
  limit?: number;
  title?: string;
}

export function TableDesktopInfoHeader(props: Props) {
  const {
    displayTitleType,
    filterConfig,
    filters,
    limit = -1,
    pageNumberConfig,
    paging,
    rowsDisplayedConfig,
    sortRowsConfig,
    title,
    type,
  } = props;

  const isTab = EDisplayTitleType.Tab === displayTitleType;

  return (
    <>
      <style jsx>{`
        h2 {
          color: ${MOBILE_TEXT};
          font-size: 24px;
          font-weight: 600;
          line-height: 28px;
          margin-top: 6px; /* design has 40px but container padding of 34px */
          margin-bottom: 40px;
        }
        div.TableDesktopInfoHeader {
          position: relative;
          color: ${PAGINATION_GREY};
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          margin-bottom: ${isTab ? 38 : 32}px;
        }
        div.info {
          font-size: 14px;
          font-weight: 500;
          line-height: 16px;
        }
        div.filter-sort-wrapper {
          display: flex;
          align-items: center;
        }
        div.filter-sort-item {
          position: relative;
          display: inline-block;
          margin-right: 29px;
          color: ${MOBILE_TEXT};
        }
        div.filter-sort-item:last-child {
          margin-right: 0;
        }
      `}</style>
      <>
        {!isTab && title && <h2>{title}</h2>}
        {paging && (
          <div className="TableDesktopInfoHeader">
            <div className="info">{numberOfElements(paging.totalElements, type, limit)}</div>
            {pageNumberConfig && rowsDisplayedConfig && (
              <div className="filter-sort-wrapper">
                {filters && filterConfig && filterConfig.onFilterChange && (
                  <div className="filter-sort-item">
                    <DropdownControl isChevron label="Filter">
                      <DropdownWrapper>
                        <DropdownContentFilters
                          style={{
                            left: 'auto',
                            right: 0,
                          }}
                          filterConfig={filterConfig}
                        >
                          {filters}
                        </DropdownContentFilters>
                      </DropdownWrapper>
                    </DropdownControl>
                  </div>
                )}
                {filters &&
                  filters[EHeaderIconType.Sort] &&
                  sortRowsConfig &&
                  sortRowsConfig.onSortChange && (
                    <div className="filter-sort-item">
                      <DropdownControl
                        isChevron
                        label="Sort by"
                        value={
                          sortRowsConfig.direction && sortRowsConfig.sort
                            ? `${
                                SORT_PLACEHOLDER_LOOKUP[sortRowsConfig.sort][
                                  sortRowsConfig.direction
                                ]
                              }`
                            : null
                        }
                      >
                        <DropdownWrapper>
                          <DropdownContentSectioned
                            style={{
                              left: 'auto',
                              right: 0,
                            }}
                          >
                            {filters[EHeaderIconType.Sort].map((item: IHeaderItem) => ({
                              name: item.headerType,
                              options: [
                                {
                                  label:
                                    SORT_DIRECTION_LOOKUP[item.headerType][EDirectionType.DESC],
                                  onChange: () =>
                                    sortRowsConfig.onSortChange({
                                      sort: item.type,
                                      direction: EDirectionType.DESC,
                                    }),
                                },
                                {
                                  label: SORT_DIRECTION_LOOKUP[item.headerType][EDirectionType.ASC],
                                  onChange: () =>
                                    sortRowsConfig.onSortChange({
                                      sort: item.type,
                                      direction: EDirectionType.ASC,
                                    }),
                                },
                              ],
                            }))}
                          </DropdownContentSectioned>
                        </DropdownWrapper>
                      </DropdownControl>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </>
    </>
  );
}
