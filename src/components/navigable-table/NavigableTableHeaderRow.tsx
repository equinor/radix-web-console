import { Table } from '@equinor/eds-core-react'
import type { ReactNode } from 'react'

export interface NavigableTableHeaderRowProps {
  /** The header cells. The trailing chevron column is added for you */
  children: ReactNode
}

/**
 * The header row that goes with `NavigableTableRow`. It adds the same empty cell
 * on the end that each row uses for its chevron, so the columns always line up.
 */
export const NavigableTableHeaderRow = (props: NavigableTableHeaderRowProps) => {
  const { children } = props

  return (
    <Table.Row>
      {children}
      <Table.Cell aria-hidden />
    </Table.Row>
  )
}
