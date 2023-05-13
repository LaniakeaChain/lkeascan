import classNames from 'classnames';
import React, { Fragment } from 'react';

import { TextTruncate } from 'components/text-truncate';
import { BOTTOM_MENU_GREY, MOBILE_LIGHT_GREY } from 'data/data-style';
import { COMBINED_LOOKUP } from 'data/table-lookup';
import { IHeaderItem, THeaderType } from 'models/models-data-general';
import { EPageType, IDictionary } from 'models/models-general';
import { defined } from 'utils/variable-evaluation';

const TEXT_TRUNCATE_WIDTH = 150;

enum ERowTypes {
  Title = 'Title',
  Tag = 'Tag',
  Pair = 'Pair',
}

function isTag(headerType) {
  return headerType === 'Type' || headerType === 'State';
}

function isTitle(headerType, pageType: EPageType) {
  if (pageType === EPageType.functionTransactionsMobile) {
    return false;
  } else if (
    pageType === EPageType.eventsTransactionsMobile ||
    pageType === EPageType.eventsContractsMobile
  ) {
    return headerType === 'Transaction Hash';
  } else if (
    pageType === EPageType.contractsMobile ||
    pageType === EPageType.contractsMobileMostActive
  ) {
    return headerType === 'Hash';
  } else {
    return headerType === 'Hash' || headerType === 'Name';
  }
}

function transformItems(headerItems: IHeaderItem[], pageType: EPageType) {
  const INIT_ROW_TYPES = {
    [ERowTypes.Title]: [],
    [ERowTypes.Tag]: [],
    [ERowTypes.Pair]: [],
  };

  return headerItems.reduce((a: IDictionary<IHeaderItem[]>, item: IHeaderItem, index: number) => {
    if (isTitle(item.headerType, pageType)) {
      a[ERowTypes.Title].push(item);
    } else if (isTag(item.headerType)) {
      a[ERowTypes.Tag].push(item);
    } else {
      a[ERowTypes.Pair].push(item);
    }

    if (index === headerItems.length - 1) {
      const emptyKeys: string[] = Object.keys(a).filter((key) => a[key].length === 0);

      emptyKeys.forEach((key) => {
        delete a[key];
      });
    }

    return a;
  }, INIT_ROW_TYPES);
}

function formatName(name: string) {
  if (name === 'Parameters') {
    return name;
  } else {
    return `${name}:`;
  }
}

interface ITableMobileItemProps {
  headerItems: IHeaderItem[];
  type: EPageType;
  row: any;
}

export function TableMobileItem({ headerItems, row, type }: ITableMobileItemProps) {
  const transformedItems: IDictionary<IHeaderItem[]> = transformItems(headerItems, type);
  const resolveRow = (headerType: THeaderType) => COMBINED_LOOKUP[type][headerType](row);
  return (
    <>
      <style jsx>{`
        li.TableMobileItem {
          position: relative;
          padding: 24px 0;
          border-top: 1px solid ${MOBILE_LIGHT_GREY};
        }
        li.TableMobileItem:first-child {
          border-top: none;
        }
        li.TableMobileItem:last-child {
          border-bottom: 1px solid ${MOBILE_LIGHT_GREY};
        }
        div.title {
          display: inline-block;
          vertical-align: top;
          max-width: ${TEXT_TRUNCATE_WIDTH}px;
        }
        div.tags {
          position: absolute;
          top: 23px;
          right: 0;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-end;
          max-width: ${TEXT_TRUNCATE_WIDTH}px;
        }
        div.tag-item {
          font-size: 0;
          margin-top: 4px;
        }
        div.tag-item:first-child {
          margin-top: 0;
        }
        div.pair {
          display: flex;
          flex-direction: row;
          white-space: pre-wrap;
          margin-top: 8px;
          width: 100%;
        }
        div.pair.--first {
          margin-top: 0;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        div.pair.--first.--isTitle {
          margin-top: 12px;
        }
        div.pair.--parameters {
          flex-direction: column;
        }
        div.pair.--parameters span {
          display: none;
        }
        div.name {
          font-size: 14px;
          line-height: 20px;
          color: ${BOTTOM_MENU_GREY};
          white-space: nowrap;
          max-width: ${TEXT_TRUNCATE_WIDTH}px;
        }
        div.value {
          font-size: 14px;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
        }
      `}</style>
      <li className="TableMobileItem">
        {Object.keys(transformedItems).map((key: string) => {
          if (key === ERowTypes.Title) {
            return (
              <div key={key} className="title">
                {transformedItems[ERowTypes.Title].map((item: IHeaderItem) => (
                  <Fragment key={item.headerType}>{resolveRow(item.headerType)}</Fragment>
                ))}
              </div>
            );
          } else if (key === ERowTypes.Tag) {
            return (
              <div key={key} className="tags">
                {transformedItems[ERowTypes.Tag].map((item: IHeaderItem) => (
                  <div key={item.headerType} className="tag-item">
                    {resolveRow(item.headerType)}
                  </div>
                ))}
              </div>
            );
          } else {
            return transformedItems[ERowTypes.Pair].map((item: IHeaderItem, index: number) => {
              if (defined(resolveRow(item.headerType))) {
                return (
                  <div
                    key={item.headerType}
                    className={classNames('pair', {
                      '--isTitle':
                        defined(transformedItems[ERowTypes.Title]) &&
                        transformedItems[ERowTypes.Title].length > 0,
                      '--first': index === 0,
                      '--parameters': item.headerType === 'Parameters',
                    })}
                  >
                    <div className="name">
                      <TextTruncate>{formatName(item.headerType)}</TextTruncate>
                    </div>
                    <span> </span>
                    <div className="value">{resolveRow(item.headerType)}</div>
                  </div>
                );
              } else {
                return null;
              }
            });
          }
        })}
      </li>
    </>
  );
}
