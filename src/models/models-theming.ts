import { IDictionary } from 'models/models-general';

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

interface MetamaskParameter {
  onboarding: string;
}

interface PaletteParameter {
  header: {
    background: string;
  };
}

export interface IThemeConfig {
  currency: string;
  smallCurrency: string;
  decimals: number;
  windowTitle: string;
  companyName: string;
  companyLink: string;
  supportEmail: string;
  logo: string;
  logoFavicon: string;
  favicon: string | IDictionary<string>;
  networkEnabled: boolean;
  profileEnabled: boolean;
  palette: PaletteParameter;
  metamask: MetamaskParameter;
  chainParameters?: AddEthereumChainParameter;
  autoRefreshDashboardMs: number;
  autoRefreshTableMs: number;
  headerEnvLabel?: string;
  supportLink?: string;
}
