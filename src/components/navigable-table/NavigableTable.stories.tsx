import { Tooltip } from '@equinor/eds-core-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from 'react-router'
import { CompactCopyButton } from '../compact-copy-button'
import { NavigableTable } from './NavigableTable'
import { NavigableTableHeaderRow } from './NavigableTableHeaderRow'
import { NavigableTableRow } from './NavigableTableRow'

/**
 * A table where each row acts as a link. Clicking anywhere on a row follows the
 * `to` destination you give it. It builds on the EDS `Table`, so you put it
 * together the same way.
 *
 * Each row exposes a real link (the trailing chevron) for keyboard and screen
 * readers, and clicking anywhere else on the row navigates there too. Links and
 * buttons inside a cell keep working on their own — the row leaves their clicks
 * alone.
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
 * A cell can hold its own interactive content. Links and buttons keep working on
 * their own — the row's click handler ignores clicks that land on them, so the
 * first row's environment link and copy button stay usable alongside the tooltip.
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
            <CompactCopyButton content="radix-canary-golang" />
          </NavigableTable.Cell>
        </NavigableTable.Row>
        <NavigableTable.Row to="/applications/radix-canary-golang" linkLabel="Open radix-canary-golang">
          <NavigableTable.Cell>radix-canary-golang</NavigableTable.Cell>
          <NavigableTable.Cell>Omnia Radix</NavigableTable.Cell>
          <NavigableTable.Cell>
            <Tooltip placement="top" title="Tooltip">
              <span>I have a tooltip</span>
            </Tooltip>
          </NavigableTable.Cell>
        </NavigableTable.Row>
      </NavigableTable.Body>
    </NavigableTable>
  ),
}
