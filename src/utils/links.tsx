import { ILinkItem } from 'models/models-general';

export const toNextLink = (link: ILinkItem): ILinkItem =>
  link
    ? {
        ...link,
        nextLinkConfig: {
          href: `/${link.href.split('/')[1]}/[detailsHash]`,
          as: link.href,
        },
      }
    : null;

export const getOptimalLink = (preferences: string[], links: ILinkItem[]): ILinkItem =>
  toNextLink(
    preferences
      .map((p) => links.find((l) => l.rel === p))
      .filter((l): l is ILinkItem => l !== undefined)
      .shift() || links[0],
  );
