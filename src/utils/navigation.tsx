import { ELinkType, ILinkItem } from 'models/models-general';

export function resolveLink(links: ILinkItem[], linkType?: ELinkType) {
  if (links && links.length > 0) {
    if (linkType) {
      return links.filter((searchLink: ILinkItem) => searchLink.rel === linkType).pop();
    } else {
      return links[links.length - 1];
    }
  } else {
    return null;
  }
}
