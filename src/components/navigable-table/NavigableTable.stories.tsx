import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from 'react-router'

import { CompactCopyButton } from '../compact-copy-button'
import { NavigableTable } from './NavigableTable'
import { NavigableTableHeaderRow } from './NavigableTableHeaderRow'
import { NavigableTableRow } from './NavigableTableRow'

/**
 * A table where each row acts as a link. Clicking anywhere on a row follows the
 * `to` destination you give it. It builds on the EDS `Table`, so you put it
 * together the same way. The only thing to remember is to reach for
 * `NavigableTable.HeaderRow` and `NavigableTable.Row`. Both quietly add the
 * trailing chevron column for you, so the header and the body can never fall out
 * of step.
 *
 * Every row is a real link underneath, so people can tab to it and press Enter,
 * and screen readers announce it properly. Any links or buttons you place inside
 * a cell keep working on their own.
 */
const meta = {
  title: 'Data Display/Navigable Table',
  component: NavigableTable,
  subcomponents: {
    'NavigableTable.Row': NavigableTableRow,
    'NavigableTable.HeaderRow': NavigableTableHeaderRow,
    'NavigableTable.Head': NavigableTable.Head,
    'NavigableTable.Body': NavigableTable.Body,
    'NavigableTable.Foot': NavigableTable.Foot,
    'NavigableTable.Caption': NavigableTable.Caption,
    'NavigableTable.Cell': NavigableTable.Cell,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NavigableTable>

export default meta
type Story = StoryObj<typeof meta>

/** Click a row, or tab to it and press Enter, to open it. */
export const Default: Story = {
  render: () => (
    <NavigableTable>
      <NavigableTable.Head>
        <NavigableTable.HeaderRow>
          <NavigableTable.Cell>Name</NavigableTable.Cell>
          <NavigableTable.Cell>Owner</NavigableTable.Cell>
          <NavigableTable.Cell>Environments</NavigableTable.Cell>
        </NavigableTable.HeaderRow>
      </NavigableTable.Head>
      <NavigableTable.Body>
        <NavigableTable.Row to="/applications/radix-web-console" linkLabel="Open radix-web-console">
          <NavigableTable.Cell>radix-web-console</NavigableTable.Cell>
          <NavigableTable.Cell>Omnia Radix</NavigableTable.Cell>
          <NavigableTable.Cell>production, development</NavigableTable.Cell>
        </NavigableTable.Row>
        <NavigableTable.Row to="/applications/radix-canary-golang" linkLabel="Open radix-canary-golang">
          <NavigableTable.Cell>radix-canary-golang</NavigableTable.Cell>
          <NavigableTable.Cell>Omnia Radix</NavigableTable.Cell>
          <NavigableTable.Cell>qa</NavigableTable.Cell>
        </NavigableTable.Row>
      </NavigableTable.Body>
    </NavigableTable>
  ),
}

/**
 * A cell can hold its own links and buttons. Here the environment link and the
 * copy button sit above the row's link, so they stay clickable and go to their
 * own destinations rather than opening the row.
 */
export const WithInteractiveContent: Story = {
  render: () => (
    <NavigableTable>
      <NavigableTable.Head>
        <NavigableTable.HeaderRow>
          <NavigableTable.Cell>Name</NavigableTable.Cell>
          <NavigableTable.Cell>Owner</NavigableTable.Cell>
          <NavigableTable.Cell>Environments</NavigableTable.Cell>
        </NavigableTable.HeaderRow>
      </NavigableTable.Head>
      <NavigableTable.Body>
        <NavigableTable.Row to="/applications/radix-web-console" linkLabel="Open radix-web-console">
          <NavigableTable.Cell>radix-web-console</NavigableTable.Cell>
          <NavigableTable.Cell>Omnia Radix</NavigableTable.Cell>
          <NavigableTable.Cell>
            <Link to="/applications/radix-web-console/environments/production">production</Link>
            <CompactCopyButton content="radix-web-console" />
          </NavigableTable.Cell>
        </NavigableTable.Row>
      </NavigableTable.Body>
    </NavigableTable>
  ),
}
