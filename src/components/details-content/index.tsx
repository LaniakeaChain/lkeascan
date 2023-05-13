import React from 'react';

import { IDetailsHighlightProps, IOverviewContentProps } from 'models/models-details-general';
import { INameValuePair } from 'models/models-general';
import { useIsDesktop } from 'utils/dimensions';

import { DetailsDesktop } from './desktop';
import { DetailsMobile } from './mobile';

export interface IDetailsContentProps {
  breadcrumbs: INameValuePair[];
  overviewConfig: IOverviewContentProps;
  highlightConfig: IDetailsHighlightProps;
  table?: JSX.Element;
}

export function DetailsContent(props: IDetailsContentProps) {
  const isDesktop = useIsDesktop();

  return isDesktop ? <DetailsDesktop {...props} /> : <DetailsMobile {...props} />;
}
