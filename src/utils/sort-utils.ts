export type sortDirection = 'ascending' | 'descending';

/**
 * Creates a copy of the array and performs multiple sort operations
 *
 * @param {Array<string>} array array to sort
 * @param {Array<function>} sorters list of sort methods
 * @returns sorted copy of array
 */
export function dataSorter<T>(
  array: Readonly<Array<T>>,
  sorters: Array<Parameters<Array<T>['sort']>[0]>
): Array<T> {
  const data = [...(array ?? [])];
  sorters.map((x) => data.sort(x));
  return data;
}

function sorter(direction: sortDirection): 1 | -1 {
  return direction === 'ascending' ? 1 : -1;
}

function sortWhenNull(
  a: unknown | null | undefined,
  b: unknown | null | undefined,
  direction: sortDirection
): number {
  if (a == null && b == null) {
    return 0;
  }

  if (a == null) {
    return -sorter(direction);
  }

  return sorter(direction);
}

export function sortCompareString(
  a: string | null | undefined,
  b: string | null | undefined,
  direction: sortDirection = 'ascending',
  caseInsensitive = true,
  when?: () => boolean
): number {
  if (when && !when()) {
    return 0;
  }

  if (a == null || b == null) {
    return sortWhenNull(a, b, direction);
  }

  const internalA = caseInsensitive ? (a ? a.toLocaleLowerCase() : '') : a;
  const internalB = caseInsensitive ? (b ? b.toLocaleLowerCase() : '') : b;

  if (internalA === internalB) {
    return 0;
  } else {
    return (internalA > internalB ? 1 : -1) * sorter(direction);
  }
}

export function sortCompareBoolean(
  a: boolean | null | undefined,
  b: boolean | null | undefined,
  direction: sortDirection = 'ascending',
  when?: () => boolean
): number {
  if (when && !when()) {
    return 0;
  }

  if (a == null || b == null) {
    return sortWhenNull(a, b, direction);
  }

  if (a === b) {
    return 0;
  } else {
    return (a && !b ? 1 : -1) * sorter(direction);
  }
}

export function sortCompareNumber(
  a: number | null | undefined,
  b: number | null | undefined,
  direction: sortDirection = 'ascending',
  when?: () => boolean
): number {
  if (when && !when()) {
    return 0;
  }

  if (a == null || b == null) {
    return sortWhenNull(a, b, direction);
  }

  if (a === b) {
    return 0;
  } else {
    return (a > b ? 1 : -1) * sorter(direction);
  }
}

export function sortCompareDate(
  a: string | Date | null | undefined,
  b: string | Date | null | undefined,
  direction: sortDirection = 'ascending',
  when?: () => boolean
): number {
  if (when && !when()) {
    return 0;
  }

  if (a == null || b == null) {
    return sortWhenNull(a, b, direction);
  }

  const internalA = (a instanceof Date ? a : new Date(a)).getTime();
  const internalB = (b instanceof Date ? b : new Date(b)).getTime();

  if (internalA === internalB) {
    return 0;
  } else {
    return (internalA > internalB ? 1 : -1) * sorter(direction);
  }
}

export function resolveSortFunctions(funcArray: Array<() => number>): number {
  return funcArray.reduce<number>(
    (prev, curr) => (prev === 0 ? curr() : prev),
    0
  );
}
