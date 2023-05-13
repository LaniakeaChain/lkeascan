import moment, { utc } from 'moment';

import { DATE_PICKER_TYPES } from 'data/data-inputs';
import { IDictionary } from 'models/models-general';
import { removeSpaces } from 'utils/format';
import { defined } from 'utils/variable-evaluation';

export function serialize(obj: IDictionary<any>, excluded?: string[]) {
  const str = [];

  for (const p in obj) {
    if (obj[p] && Object.prototype.hasOwnProperty.call(obj, p)) {
      const param = `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`;

      if (defined(excluded)) {
        if (!excluded.includes(p)) {
          str.push(param);
        }
      } else {
        str.push(param);
      }
    }
  }

  return str.join('&');
}

function exclude(obj: IDictionary<any>, excluded: string[] = []): { [key: string]: any } {
  const returnObject = {};

  for (const k in obj) {
    if (obj[k] && Object.prototype.hasOwnProperty.call(obj, k) && !excluded.includes(k)) {
      returnObject[k] = obj[k];
    }
  }

  return returnObject;
}

const CHECKBOX_FILTERS = ['contractType', 'transactionType'];
const TEXT_FILTERS = ['eventName', 'holderAddress'];

function transformTimeFilterToString(dates: moment.Moment[], type: string): string {
  if (dates && dates.length > 0) {
    const [start, end] = dates;
    return `( ${type} ge ${start.toISOString()} and ${type} lt ${end.toISOString()} )`;
  } else {
    return null;
  }
}

export function transformMultiFilterToString(filters: IDictionary<any[]>) {
  let filterString = '';

  Object.keys(filters).forEach((filterKey: string) => {
    const prefix = filterString ? ' and ' : '';

    if (DATE_PICKER_TYPES.includes(filterKey) && filters[filterKey].every(defined)) {
      filterString += prefix + transformTimeFilterToString(filters[filterKey], filterKey);
    } else if (CHECKBOX_FILTERS.includes(filterKey) && filters[filterKey].length > 0) {
      filterString += prefix + transformFilterArrayToString({ [filterKey]: filters[filterKey] });
    } else if (
      TEXT_FILTERS.includes(filterKey) &&
      filters[filterKey].length > 0 &&
      filters[filterKey][0]
    ) {
      filterString += prefix + transformFilterArrayToString({ [filterKey]: filters[filterKey] });
    }
  });

  return filterString;
}

export function transformFilterArrayToString(currentFilters: IDictionary<string[]>): string {
  const arr = Object.keys(currentFilters);

  if (arr && arr.length > 0) {
    return arr.reduce((filterString: string, type: string) => {
      // all filter types
      if (currentFilters[type] && currentFilters[type].length > 0) {
        if (filterString !== '') {
          filterString += ' and ';
        }

        filterString += currentFilters[type].reduce((a: string, c: string, i: number) => {
          // each filter type
          if (c !== 'All') {
            c = removeSpaces(c);

            if (i > 0) {
              a += ` or ${type} eq ${c}`;
            } else {
              a += `${type} eq ${c}`;
            }
          }

          if (i === currentFilters[type].length - 1) {
            return `( ${a} )`;
          } else {
            return a;
          }
        }, '');
      }

      return filterString;
    }, '');
  } else {
    return null;
  }
}

let datePickertype;

export function filterToCurrentSelectedOptions(filter: string): IDictionary<any[]> {
  if (filter) {
    const filters: string[] = filter.split(') and (');
    return filters.reduce((filterObject = {}, currentFilter) => {
      if (
        DATE_PICKER_TYPES.some((type) => {
          if (currentFilter.includes(type)) {
            datePickertype = type;
            return true;
          } else {
            return false;
          }
        })
      ) {
        const parts = filter.replace(/[()]/g, '').split(' ');

        filterObject[datePickertype] = parts.reduce((a: any[], part: string, index: number) => {
          if (parts[index - 1] === 'ge') {
            a.push(utc(part));
          } else if (parts[index - 1] === 'lt') {
            a.push(utc(part));
          }

          return a;
        }, []);

        return filterObject;
      } else {
        const parts = filter.replace(/[()]/g, '').split(' ');

        const otherFilters = parts.reduce(
          (a: IDictionary<string[]>, part: string, index: number) => {
            if (parts[index + 1] === 'eq') {
              if (a[part]) {
                a[part] = [...a[part], parts[index + 2]];
              } else {
                a[part] = [parts[index + 2]];
              }
            }

            return a;
          },
          {},
        );

        return { ...filterObject, ...otherFilters };
      }
    }, {});
  } else {
    return {};
  }
}

export function generateLink(pathname: string, query: { [key: string]: string | string[] }) {
  const segments = pathname.split('/').filter((id) => id);
  const dynamicSegments = [];

  const segmentsWithValues = segments.map((segment) => {
    const matches = /\[(.*)\]/g.exec(segment);

    if (matches) {
      const dynamicSegmentName = matches[1];
      dynamicSegments.push(dynamicSegmentName);
      const segmentValueMaybeArray = query[dynamicSegmentName];

      const segmentValue = Array.isArray(segmentValueMaybeArray)
        ? segmentValueMaybeArray.join('')
        : segmentValueMaybeArray;

      return encodeURIComponent(segmentValue);
    } else {
      return segment;
    }
  });

  return {
    href: {
      pathname,
      query,
    },
    as: {
      pathname: `/${segmentsWithValues.join('/')}`,
      query: exclude(query, dynamicSegments),
    },
  };
}
