import { EIconType } from 'models/models-icons';
import { IMenuItem } from 'models/models-side-menu';
import { defined } from 'utils/variable-evaluation';

import { themed } from '../theming';

export const ITEMS_MAIN: IMenuItem[] = [
  {
    name: 'Dashboard',
    iconType: EIconType.Dashboard,
  },
  {
    name: 'Contracts',
    iconType: EIconType.Contracts,
  },
  {
    name: 'Tokens',
    iconType: EIconType.Tokens,
    isPaid: true,
  },
  {
    name: 'Events',
    iconType: EIconType.Events,
    isPaid: true,
  },
  {
    name: 'Transactions',
    iconType: EIconType.Transactions,
  },
  {
    name: 'Blocks',
    iconType: EIconType.Blocks,
  },
  {
    name: 'Network',
    iconType: EIconType.Network,
  },
].filter(
  (x) =>
    ((x.name !== 'Network' ||
      themed('networkEnabled') ||
      process.env.DISPLAY_NETWORK_TAB === 'enabled') &&
      x.isPaid === undefined) ||
    x.isPaid === (process.env.ENABLE_PAID_FEATURES === 'enabled'),
);

export const MENU_SIDE_DESKTOP_ITEMS_TOP: IMenuItem[] = ITEMS_MAIN;

export const MENU_SIDE_DESKTOP_ITEMS_BOTTOM: IMenuItem[] = [
  {
    name: 'Status',
    iconType: EIconType.Status,
    externalPath: '#',
  },
  {
    name: 'Contact / Support',
    iconType: EIconType.Support,
    externalPath: defined(themed('supportLink'))
      ? themed('supportLink')
      : `mailto:${themed('supportEmail')}`,
  },
/*
  {
    name: themed('companyName'),
    iconType: EIconType.Web,
    externalPath: themed('companyLink'),
  },
*/
];

export const MENU_SIDE_MOBILE_ITEMS_TOP: IMenuItem[] = [
  ...ITEMS_MAIN,
  {
    name: 'Profile',
    iconType: EIconType.Profile,
  },
].filter((it) => it.name !== 'Profile' || themed('profileEnabled'));
