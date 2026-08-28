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
 * Every row is a real link underneath, so people can tab to it and press Enter,
 * and screen readers announce it properly. There are two ways to keep a cell's
 * contents clickable on top of that link. Plain links and buttons already work
 * on their own. For anything else, or when you would rather be explicit, wrap
 * the contents in `NavigableTable.InteractiveCell`.
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
    'NavigableTable.InteractiveCell': NavigableTable.InteractiveCell,
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
 * Two ways to keep a cell's contents clickable on top of the row link. The first
 * row's environment link is a plain `Cell` and works on its own. The second row
 * wraps its Tooltip in `NavigableTable.InteractiveCell`, which you
 * need for other interactive content which is not buttons/links
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
          <NavigableTable.InteractiveCell>
            <Tooltip placement="top" title="Tooltip">
              <span>I have a tooltip</span>
            </Tooltip>
          </NavigableTable.InteractiveCell>
        </NavigableTable.Row>
      </NavigableTable.Body>
    </NavigableTable>
  ),
}
