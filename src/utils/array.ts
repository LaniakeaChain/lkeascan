import { defined } from './variable-evaluation';

export function createArrayOf<C>(content: C, length: number): C[] {
  return new Array(length).fill(content);
}

export function groupBy(xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function flatten(arr) {
  return arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

export function addToArrayIfNotThere(arr, val) {
  if (arr.indexOf(val) === -1) {
    return [...arr, val];
  } else {
    return arr;
  }
}

export function removeFromArrayIfThere(arr, val) {
  if (arr.indexOf(val) > -1) {
    return arr.filter((arrItem) => arrItem !== val);
  } else {
    return arr;
  }
}

export function removeInArrayByIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function findArrayIndex(array, predicateFunction) {
  const length = !defined(array) ? 0 : array.length;

  if (!length) {
    return -1;
  }

  let index = -1;

  for (let i = 0; i < array.length; ++i) {
    if (predicateFunction(array[i])) {
      index = i;
      break;
    }
  }

  return index;
}

export function applySortOrder<T>(arr: T[], order: string[], objProp?: string): T[] {
  const sortedItems = [];

  order.map((key: string) => {
    let found = false;

    arr = arr.filter((item) => {
      const itemKey = objProp ? item[objProp] : item;

      if (!found && itemKey === key) {
        sortedItems.push(item);
        found = true;
        return false;
      } else {
        return true;
      }
    });
  });

  return sortedItems;
}
