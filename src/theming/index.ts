import { CHAIN_ID } from 'data/data-fetch';
import { HI_BLUE } from 'data/data-style';
import { IHeadMeta } from 'models/models-general';
import { IThemeConfig } from 'models/models-theming';

import themeList from '../theme.json';

const theme = themeList[process.env.SLUG];

const DEFAULT: IThemeConfig = {
  currency: 'LKEA',
  smallCurrency: 'Wei',
  decimals: 18,
  windowTitle: 'Laniakea | Blockchain Explorer',
  companyName: 'Laniakea Labs',
  companyLink: 'https://www.Laniakea.com/',
  supportEmail: 'support@laniakea.com',
  logo: '/static/sirato/logo-white.svg',
  logoFavicon: '/static/sirato/logo-mobile.svg',
  palette: {
    header: {
      background: HI_BLUE,
    },
  },
  favicon: {
    '32': '/static/favicon-32x32.png',
    '16': '/static/favicon-16x16.png',
  },
  profileEnabled: false,
  autoRefreshTableMs: 0,
  autoRefreshDashboardMs: 0,
  networkEnabled: process.env.DISPLAY_NETWORK_TAB === 'enabled',
  metamask: {
    onboarding: `Please, add the network ${CHAIN_ID} to Metamask. More help: <a target="_blank" href="https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-custom-Network-RPC-and-or-Block-Explorer">How to add a custom Network</a>.`,
  },
  chainParameters: {
    chainId: `0x${Number(CHAIN_ID)
      .toString(16)
      .toUpperCase()}`,
    chainName: 'Epirus Test',
    nativeCurrency: {
      name: 'LKEA',
      symbol: 'wei',
      decimals: 18,
    },
    rpcUrls: ['http://localhost:8545'],
    blockExplorerUrls: ['https://127.0.0.1:3000'],
  },
};

const DEFAULT_HEAD_META: IHeadMeta = {
  title: DEFAULT.windowTitle,
  description: 'Blockchain Explorer for viewing Contracts, Tokens, Transactions and Blocks.',
  url: DEFAULT.companyLink,
  logo: DEFAULT.logo,
  favicon: DEFAULT.favicon,
};

export const themed = (key: string) => {
  if (theme && key in theme) {
    return theme[key];
  } else {
    return DEFAULT[key];
  }
};

export const themedHead = (): IHeadMeta => ({
  ...DEFAULT_HEAD_META,
  url: themed('companyLink'),
  title: themed('windowTitle'),
  logo: themed('logo'),
  favicon: themed('favicon'),
});
