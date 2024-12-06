import { Icon, type IconProps } from '@equinor/eds-core-react';
import {
  type IconData,
  chevron_down,
  chevron_up,
  unfold_more,
} from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';

import type { SortDirection } from './sort-utils';

function getTableSortIcon(dir: SortDirection): IconData {
  switch (dir) {
    case 'ascending':
      return chevron_down;
    case 'descending':
      return chevron_up;
    default:
      return unfold_more;
  }
}

export function getNewSortDir(direction: SortDirection, nullable?: boolean) {
  if (!direction) {
    return 'ascending';
  }

  if (direction === 'ascending') {
    return 'descending';
  }

  return nullable ? undefined : 'ascending';
}

export const TableSortIcon: FunctionComponent<{
  direction: SortDirection;
  size?: IconProps['size'];
}> = ({ direction, size = 16 }) => (
  <Icon
    style={{ marginLeft: 'auto', marginRight: 0 }}
    data={getTableSortIcon(direction)}
    size={size}
  />
);
