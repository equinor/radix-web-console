import { Icon, Table } from '@equinor/eds-core-react'
import { chevron_right } from '@equinor/eds-icons'
import type { FunctionComponent, ReactNode } from 'react'
import { Link } from 'react-router'

import styles from './NavigableTableRow.module.css'

export interface NavigableTableRowProps {
  /** Where the row takes you when it is clicked */
  to: string
  /** What screen readers read out, since the link itself only shows a chevron */
  linkLabel: string
  /** The row's cells. The trailing chevron cell is added for you */
  children: ReactNode
}

/**
 * A single row that behaves like a link. Drop in your usual `Table.Cell`
 * children and the row adds the chevron cell on the end for you. Pair it with
 * `NavigableTable.HeaderRow` so the header keeps that last column in line.
 */
export const NavigableTableRow: FunctionComponent<NavigableTableRowProps> = (props) => {
  const { to, linkLabel, children } = props

  return (
    <Table.Row className={styles.row}>
      {children}
      <Table.Cell variant="icon" className={styles.chevron}>
        <Link className={styles.rowLink} to={to} aria-label={linkLabel}>
          <Icon data={chevron_right} aria-hidden />
        </Link>
      </Table.Cell>
    </Table.Row>
  )
}
