import { CSSProperties } from 'react';

import { INameElementValue } from './models-general';

interface ITitleConfig {
  label: string;
  tag?: string;
  error?: boolean;
  isPrivate?: boolean;
}

export interface ISubtitleConfig {
  value: string;
  label: string;
  isNoCopyIcon?: boolean;
  copyText?: string;
  isNoRenameIcon?: boolean;
  display?: string;
}

export interface IDetailsHighlightProps {
  title: string;
  value: string;
  additionalDetailsLength?: number;
  style?: CSSProperties;
  unit?: string;
  holdersCount?: string;
  transferCount?: string;
  tooltipContentToCopy?: string;
  symbol?: string;
}

export interface IOverviewContentProps {
  titleConfig: ITitleConfig;
  subtitleConfig: ISubtitleConfig;
  hashLabelConfig?: INameElementValue;
  info?: INameElementValue[][];
  additionalDetails?: INameElementValue[][];
  isAdditionalDetailsOpen?: boolean;
  onAdditionalDetailsClick?(): void;
}
