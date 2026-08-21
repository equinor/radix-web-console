import { Table } from '@equinor/eds-core-react'
import type { ComponentProps } from 'react'

import { NavigableTableHeaderRow } from './NavigableTableHeaderRow'
import { NavigableTableRow } from './NavigableTableRow'

const NavigableTableRoot = (props: ComponentProps<typeof Table>) => <Table {...props} />
// Shown as the component name in Storybook autodocs instead of "NavigableTableRoot"
NavigableTableRoot.displayName = 'NavigableTable'

/**
 * The EDS `Table`, dressed up so a whole row can act as a link. Use
 * `NavigableTable.HeaderRow` and `NavigableTable.Row` and they take care of the
 * chevron column that hints at the navigation. `Head`, `Body`, `Foot`,
 * `Caption` and `Cell` are the familiar EDS parts, handed straight back to you.
 */
export const NavigableTable = Object.assign(NavigableTableRoot, {
  Head: Table.Head,
  Body: Table.Body,
  Foot: Table.Foot,
  Caption: Table.Caption,
  Cell: Table.Cell,
  HeaderRow: NavigableTableHeaderRow,
  Row: NavigableTableRow,
})
