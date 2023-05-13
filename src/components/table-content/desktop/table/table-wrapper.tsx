import React, { ReactNode, useEffect, useState } from 'react';

import { BreadcrumbsView } from 'components/app-shell/breadcrumbs-view';
import { CardView } from 'components/card-view';
import { LoadingSpinner } from 'components/placeholders/loading-spinner';
import { MAIN_TABLE_PADDING } from 'data/data-style';
import { EDisplayTitleType, IHeaderItem, IPaging } from 'models/models-data-general';
import { EPageType, INameValuePair } from 'models/models-general';
import {
  IMultiFilterConfig,
  IPageNumberConfig,
  IRowsDisplayedConfig,
  ISortConfig,
} from 'models/models-table-general';
import { headerItemsToFilters } from 'utils/inputs';
import { useTimeout } from 'utils/use-timeout';

import { TableFooter } from './table-info-footer';
import { TableDesktopInfoHeader } from './table-info-header';

interface Props {
  breadcrumbs?: INameValuePair[];
  children: JSX.Element;
  displayTitleType?: EDisplayTitleType;
  filterConfig?: IMultiFilterConfig;
  headerItems: IHeaderItem[];
  isZeroElements: boolean;
  loading: boolean;
  pageNumberConfig?: IPageNumberConfig;
  paging?: IPaging;
  rowsDisplayedConfig?: IRowsDisplayedConfig;
  skipCardView?: boolean;
  sortRowsConfig?: ISortConfig;
  title?: string;
  limit?: number;
  topRightCornerContent?: () => ReactNode;
  type: EPageType;
}

export function TableDesktopWrapper({
  breadcrumbs,
  children,
  displayTitleType,
  filterConfig,
  headerItems,
  isZeroElements,
  limit,
  loading,
  pageNumberConfig,
  paging,
  rowsDisplayedConfig,
  skipCardView,
  sortRowsConfig,
  title,
  topRightCornerContent,
  type,
}: Props) {
  const [isThrottledLoading, setLoading] = useState(false);
  const [setLoadingTimeout] = useTimeout(200);

  useEffect(() => {
    setLoadingTimeout(() => setLoading(loading));
  }, [loading, setLoadingTimeout]);

  const renderTitle = (displayType?: EDisplayTitleType) => (
    <TableDesktopInfoHeader
      displayTitleType={displayType}
      type={type}
      limit={limit}
      filters={headerItemsToFilters(headerItems)}
      sortRowsConfig={sortRowsConfig}
      filterConfig={filterConfig}
      pageNumberConfig={pageNumberConfig}
      rowsDisplayedConfig={rowsDisplayedConfig}
      paging={paging}
      title={title}
    />
  );

  const renderFooter = () => {
    if (paging && pageNumberConfig && rowsDisplayedConfig && !isZeroElements) {
      return (
        <TableFooter
          paging={paging}
          pageNumberConfig={pageNumberConfig}
          rowsDisplayedConfig={rowsDisplayedConfig}
        />
      );
    } else {
      return null;
    }
  };

  const renderLoader = (displayType?: EDisplayTitleType) => {
    if (isThrottledLoading) {
      return (
        <LoadingSpinner
          style={{
            position: 'absolute',
            top: displayType === EDisplayTitleType.Tab ? 14 : MAIN_TABLE_PADDING,
            right: MAIN_TABLE_PADDING,
          }}
        />
      );
    } else if (topRightCornerContent) {
      return topRightCornerContent();
    }
  };

  const renderContent = (displayType?: EDisplayTitleType) => (
    <>
      {renderLoader(displayType)}
      {renderTitle(displayType)}
      {children}
      {renderFooter()}
    </>
  );

  if (displayTitleType === EDisplayTitleType.Tab || skipCardView) {
    return renderContent(displayTitleType);
  } else {
    if (breadcrumbs) {
      return (
        <BreadcrumbsView breadcrumbs={breadcrumbs}>
          <CardView>{renderContent(EDisplayTitleType.Normal)}</CardView>
        </BreadcrumbsView>
      );
    } else {
      return <CardView>{renderContent(EDisplayTitleType.Normal)}</CardView>;
    }
  }
}
