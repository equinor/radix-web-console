import { Icon, Table } from '@equinor/eds-core-react'
import { chevron_right } from '@equinor/eds-icons'
import type { FunctionComponent, MouseEvent, ReactNode } from 'react'
import { Link, type LinkProps, useNavigate } from 'react-router'

import styles from './NavigableTableRow.module.css'

export interface NavigableTableRowProps {
  /** Where the row takes you when it is clicked */
  to: LinkProps['to']
  /** What screen readers read out, since the link itself only shows a chevron */
  linkLabel: LinkProps['aria-label']
  /** The row's cells. The trailing chevron cell is added for you */
  children: ReactNode
}

// Clicks that land on these are handled by the element itself, not row navigation
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, label, [role="button"], [contenteditable="true"]'

/**
 * A single row that behaves like a link. Drop in your usual `Table.Cell`
 * children and the row adds the chevron cell on the end for you. Pair it with
 * `NavigableTable.HeaderRow` so the header keeps that last column in line.
 *
 * The whole row navigates through a JS click handler, while the chevron cell
 * keeps a real `<a>` for keyboard, screen readers and open-in-new-tab. A CSS
 * stretched link is deliberately not used: Safari cannot position an overlay
 * against a table row (WebKit bug 240961), so it would escape the row there.
 */
export const NavigableTableRow: FunctionComponent<NavigableTableRowProps> = (props) => {
  const { to, linkLabel, children } = props

  const navigate = useNavigate()

  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>) => {
    const target = event.target as HTMLElement
    // let interactive children (links, buttons, …) handle their own clicks
    if (target.closest(INTERACTIVE_SELECTOR)) return
    // don't navigate away while the user is selecting text
    if (window.getSelection()?.toString()) return
    // leave modified clicks (open in new tab/window) to the browser
    if (event.metaKey || event.ctrlKey || event.shiftKey) return

    navigate(to)
  }

  return (
    <Table.Row className={styles.row} onClick={handleRowClick}>
      {children}
      <Table.Cell variant="icon" className={styles.chevron}>
        <Link className={styles.rowLink} to={to} aria-label={linkLabel}>
          <Icon data={chevron_right} aria-hidden />
        </Link>
      </Table.Cell>
    </Table.Row>
  )
}
