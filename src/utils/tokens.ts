import { ITokenDetailsFetch } from 'models/models-details-tokens';
import { ITokensData } from 'models/models-table-tokens';
import { ETagType } from 'models/models-tags';

export function resolveTokenName(data: ITokensData | ITokenDetailsFetch): string {
  const { address, name, symbol } = data;

  if (name && symbol) {
    return `${name}`;
  } else if (name) {
    return name;
  } else {
    return address;
  }
}

export function tokenTableTagLookup(tagType: ETagType): string {
  switch (tagType) {
    default:
      return 'Hybrid';
    case ETagType.ERC20:
      return 'Fungible';
    case ETagType.ERC721:
      return 'NonFungible';
    case ETagType.ERC777:
      return 'Fungible';
    case ETagType.ERC223:
      return 'Fungible';
  }
}

export function tokenDetailsTagLookup(tagType: ETagType): string {
  switch (tagType) {
    default:
      return 'Custom';
    case ETagType.ERC1155:
      return 'Hybrid (ERC1155)';
    case ETagType.ERC20:
      return 'Fungible (ERC20)';
    case ETagType.ERC721:
      return 'Non-Fungible (ERC721)';
    case ETagType.ERC777:
      return 'Fungible (ERC777)';
    case ETagType.ERC223:
      return 'Fungible (ERC223)';
  }
}

export function resolveTokenNameWithSymbol(data: ITokensData | ITokenDetailsFetch): string {
  const { address, name, symbol } = data;

  if (name && symbol) {
    return `${name} (${symbol})`;
  } else if (name) {
    return name;
  } else if (symbol) {
    return symbol;
  } else {
    return address;
  }
}
