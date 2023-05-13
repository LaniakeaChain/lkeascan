import { ILinkItem } from './models-general';

export interface ISearchFetch {
  type: string;
  link: ILinkItem;
}

export interface ISearchResultsFetch {
  data: ISearchFetch[];
}
