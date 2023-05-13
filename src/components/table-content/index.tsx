import React, { ReactNode } from 'react';

import { ErrorMessage } from 'components/placeholders/error-message';
import { Loading } from 'components/placeholders/loading';
import { EDisplayTitleType, IError, IHeaderItem, TTableFetch } from 'models/models-data-general';
import { EPageType, INameValuePair } from 'models/models-general';
import { ITableFetchConfig } from 'models/models-table-general';
import { useIsDesktop } from 'utils/dimensions';

import { TableDesktop } from './desktop';
import { TableMobile } from './mobile';

export interface ITableContentProps {
  breadcrumbs?: INameValuePair[];
  displayTitleType?: EDisplayTitleType;
  error?: IError;
  loading?: boolean;
  limit?: number;
  isFilterSet: boolean;
  type: EPageType;
  headerItems: IHeaderItem[];
  data: Partial<TTableFetch>;
  noElementsMessage: string;
  tableFetchConfig?: ITableFetchConfig;
  skipCardView?: boolean;
  title?: string;
  topRightCornerContent?: () => ReactNode;
}

export function TableContent(props: ITableContentProps) {
  const { data, error } = props;
  const isDesktop = useIsDesktop();

  if (error) {
    return <ErrorMessage>Something went wrong. No results from data.</ErrorMessage>;
  } else if (data) {
    if (isDesktop) {
      return <TableDesktop {...props} />;
    } else {
      return <TableMobile {...props} />;
    }
  } else {
    if (props.displayTitleType === EDisplayTitleType.Tab) {
      return <Loading isThrottled style={{ margin: '50px 0', minHeight: '100vh' }} />;
    } else {
      return <Loading isThrottled style={{ margin: '50px 0' }} />;
    }
  }
}
