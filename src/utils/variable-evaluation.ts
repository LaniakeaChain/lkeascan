import { themed } from 'theming';

export const defined = (x) => typeof x !== 'undefined' && x !== null;

export function isHash(x: unknown) {
  return (
    (typeof x === 'string' && x.substr(0, 2) === '0x' && (x.length === 42 || x.length === 66)) ||
    (typeof x === 'string' && x.substr(0, 2) === '00' && x.length === 64)
  );
}

export function isEmptyObject(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

const autoRefreshDashboardMs =
  themed('autoRefreshDashboardMs') > 0 ? themed('autoRefreshDashboardMs') : 0;

export function autoRefreshDashboard() {
  return { refreshInterval: autoRefreshDashboardMs };
}

export const autoRefreshTableMs =
  themed('autoRefreshTableMs') > 0 ? themed('autoRefreshTableMs') : 0;
