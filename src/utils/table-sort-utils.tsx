import { Icon, IconProps } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  IconData,
  unfold_more,
} from '@equinor/eds-icons';

import { sortDirection } from './sort-utils';

function getTableSortIcon(dir: sortDirection): IconData {
  switch (dir) {
    case 'ascending':
      return chevron_down;
    case 'descending':
      return chevron_up;
    default:
      return unfold_more;
  }
}

export function getNewSortDir(
  direction: sortDirection,
  nullable?: boolean
): sortDirection | null {
  if (!direction) {
    return 'ascending';
  }

  if (direction === 'ascending') {
    return 'descending';
  }

  return nullable ? null : 'ascending';
}

export function tableDataSorter<T>(
  array: Readonly<Array<T>>,
  sorters: Array<Parameters<Array<T>['sort']>[0]>
): Array<T> {
  const data = array?.length > 0 ? [...array] : [];
  sorters?.map((x) => data.sort(x));
  return data;
}

export const TableSortIcon = ({
  direction,
  size = 16,
}: {
  direction: sortDirection;
  size?: IconProps['size'];
}): JSX.Element => (
  <Icon
    style={{ marginLeft: 'auto', marginRight: 0 }}
    data={getTableSortIcon(direction)}
    size={size}
  />
);
