import React from 'react';

import { ISearchFetch } from 'models/models-data-search';
import { IDictionary } from 'models/models-general';
import { applySortOrder } from 'utils/array';
import { capitalize } from 'utils/format';

import { SearchBarDropdownSuccessCategory } from './success-category';
import { SearchBarSuccessNoResults } from './success-no-results';

const SORT_ORDER = ['contracts', 'tokens', 'transactions', 'accounts', 'blocks'];

interface Props {
  isFullscreen: boolean;
  highlightIndex: number;
  data: ISearchFetch[];
  onLinkClick(item): void;
}

export function SearchBarDropdownSuccess({
  data,
  highlightIndex,
  isFullscreen,
  onLinkClick,
}: Props) {
  if (data && data.length > 0) {
    const transformData = (a: IDictionary<ISearchFetch[]>, c: ISearchFetch) => {
      if (a[c.type]) {
        a[c.type].push(c);
      } else {
        a[c.type] = [c];
      }

      return a;
    };

    const transformedData: IDictionary<ISearchFetch[]> = data.reduce(transformData, {});
    let categoryKeys = Object.keys(transformedData);
    const notInSort = categoryKeys.filter((key: string) => !SORT_ORDER.includes(key));
    const sortedKeys = applySortOrder(categoryKeys, SORT_ORDER);
    categoryKeys = [...notInSort, ...sortedKeys];
    return (
      <>
        <style jsx>{`
          div.SearchBarDropdownSuccess {
            background-color: #fff;
          }
        `}</style>
        <div className="SearchBarDropdownSuccess">
          {categoryKeys.map((categoryKey: string, categoryIndex: number) => (
            <SearchBarDropdownSuccessCategory
              key={categoryKey}
              categoryIndex={categoryIndex}
              accIndex={categoryKeys.reduce((a: number, c, i) => {
                if (categoryIndex > i) {
                  a += transformedData[c].length;
                }

                return a;
              }, 0)}
              highlightIndex={highlightIndex}
              title={capitalize(categoryKey)}
              items={transformedData[categoryKey]}
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
      </>
    );
  } else {
    if (isFullscreen) {
      return <SearchBarSuccessNoResults />;
    } else {
      return null;
    }
  }
}
