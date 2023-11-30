import { Icon, IconProps } from '@equinor/eds-core-react';
import {
  IconData,
  chevron_down,
  chevron_up,
  unfold_more,
} from '@equinor/eds-icons';
import { FunctionComponent } from 'react';

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

export const TableSortIcon: FunctionComponent<{
  direction: sortDirection;
  size?: IconProps['size'];
}> = ({ direction, size = 16 }) => (
  <Icon
    style={{ marginLeft: 'auto', marginRight: 0 }}
    data={getTableSortIcon(direction)}
    size={size}
  />
);
