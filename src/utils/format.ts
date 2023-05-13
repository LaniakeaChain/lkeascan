import { isBoolean } from 'util';

import Big from 'big.js';
import { ethers } from 'ethers';
import moment from 'moment';

import { themed } from 'theming';

import { TYPE_LOOKUP } from '../data/table-lookup';

import { defined } from './variable-evaluation';

function commafy(x: string): string {
  // ie. add commas
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatNativeToDecimals(ethValue: string): string {
  return ethers.utils.formatUnits(
    ethers.utils.parseEther(Number(ethValue).toFixed(18)),
    themed('decimals'),
  );
}

export function formatWithCommas(
  numberish: number | string,
  aboveZeroDp?: number,
  belowZeroDp?: number,
): string {
  if (typeof numberish === 'string' || !isNaN(numberish)) {
    const bigNumber = Big(numberish);

    if (bigNumber.eq(0)) {
      return bigNumber.toFixed(defined(aboveZeroDp) ? aboveZeroDp : 2);
    } else if (bigNumber.gt(1)) {
      return commafy(bigNumber.toFixed(defined(aboveZeroDp) ? aboveZeroDp : 0));
    } else {
      if (belowZeroDp) {
        const limitedStr: string = bigNumber.toFixed(belowZeroDp);
        const limitedNum: number = parseFloat(limitedStr);
        return limitedNum.toString();
      } else {
        return bigNumber.toFixed();
      }
    }
  } else {
    return '-';
  }
}

export function formatIntegersWithComma(x: any, aboveZeroDp?: number): string {
  if (defined(x)) {
    if (Big(x).eq(0)) {
      return Big(x).toFixed(defined(aboveZeroDp) ? aboveZeroDp : 0);
    } else {
      return formatWithCommas(x);
    }
  }
}

export function formatHash(hash: string) {
  if (defined(hash)) {
    return formatWithEllipsis(hash);
  } else {
    return '-';
  }
}

export function formatWithEllipsis(text: string) {
  if (defined(text)) {
    let result = text;

    if (typeof text === 'number' || isBoolean(text)) {
      result = String(text);
    } else if (typeof text !== 'string') {
      return text;
    }

    if (result.length < 13) {
      return result;
    }

    return `${result.substr(0, 5)}...${result.substr(-5)}`;
  } else {
    return '-';
  }
}

export function formatHashLong(x: string) {
  if (defined(x)) {
    return `${x.substr(0, 21)}...${x.substr(x.length - 21, x.length)}`;
  } else {
    return '-';
  }
}

export function formatDateDiffFromNow(iso: string): string {
  const secondsFromNow = moment().diff(moment(iso)) / 1000;

  if (secondsFromNow >= 20 && secondsFromNow < 60) {
    return 'less than a minute ago';
  } else {
    return moment(iso).fromNow();
  }
}

export function formatIsoToDayYearMonth(iso: string) {
  return moment(iso).format('MMMM D, YYYY');
}

export function formatIsoToDayMonth(iso: string) {
  return moment(iso).format('DD.MM');
}

export function formatIsoToMonthYear(iso: string) {
  return moment(iso)
    .add(5, 'days')
    .format('MMM YYYY');
}

export function formatIsoToHoursMinutesSeconds(iso: string) {
  return moment(iso).format('h:mm a');
}

export function formatIsoToHoursSeconds(iso: string) {
  return moment(iso).format('h a');
}

export function pathToName(path: string) {
  const pathBlocks = path.split('/');

  if (pathBlocks.length > 0) {
    return capitalize(pathBlocks[1]);
  }
}

export function toPath(name) {
  return name
    .replace(/-/g, '')
    .replace(/\s/g, '-')
    .replace(/[.,]/g, '')
    .toLowerCase();
}

export function capitalize(text: string) {
  if (defined(text) && text.length > 0) {
    return text[0].toUpperCase() + text.slice(1, text.length);
  } else {
    return text;
  }
}

export function removeSpaces(x: string): string {
  if (defined(x)) {
    return x.replace(/\s/g, '');
  } else {
    return '';
  }
}

export function numberOfElements(total, type, limit) {
  const prefix = limit > 0 && total >= limit ? 'Showing +' : 'Showing ';

  const message = `${prefix}${total !== 0 ? formatWithCommas(total) : 0} ${
    TYPE_LOOKUP[type] ? TYPE_LOOKUP[type] : type
  }`;

  if (total === 1) {
    return message.slice(0, -1);
  } else {
    return message;
  }
}

export function spaceByCapitalLetter(x: string) {
  return x.match(/[A-Z][a-z]+/g).join(' ');
}
