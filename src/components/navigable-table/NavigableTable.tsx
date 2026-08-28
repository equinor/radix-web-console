import { Table } from '@equinor/eds-core-react'
import type { ComponentProps } from 'react'
import { NavigableTableHeaderRow } from './NavigableTableHeaderRow'
import { NavigableTableRow } from './NavigableTableRow'
import styles from './NavigableTableRow.module.css'

const NavigableTableRoot = (props: ComponentProps<typeof Table>) => <Table {...props} />
// Shown as the component name in Storybook autodocs instead of "NavigableTableRoot"
NavigableTableRoot.displayName = 'NavigableTable'

/**
 * A `Cell` for content that has to stay clickable on top of the row's link.
 * This is needed for interactive content like tooltips or similar without buttons/links
 */
const InteractiveCell = (props: ComponentProps<typeof Table.Cell>) => (
  <Table.Cell className={styles.interactive} {...props} />
)

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
  InteractiveCell: InteractiveCell,
  HeaderRow: NavigableTableHeaderRow,
  Row: NavigableTableRow,
})
