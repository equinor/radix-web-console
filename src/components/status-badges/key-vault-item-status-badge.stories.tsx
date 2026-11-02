import type { Meta, StoryObj } from '@storybook/react-vite'
import { KEY_VAULT_ITEM_STATUS_MAP, KeyVaultItemStatusBadge } from './key-vault-item-status-badge'

const statuses = Object.keys(KEY_VAULT_ITEM_STATUS_MAP)

/** Badge that shows the status of an Azure Key Vault item (Consistent, Pending or NotAvailable), falling back to "Unsupported". */
const meta = {
  title: 'Primitives/Status Badges/Key Vault Item',
  component: KeyVaultItemStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof KeyVaultItemStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

/** When an item has status "Pending", we display it as "Missing" */
export const Pending: Story = { args: { status: 'Pending' } }
/** A resolved item is shown as "Available" */
export const Consistent: Story = { args: { status: 'Consistent' } }
export const NotAvailable: Story = { args: { status: 'NotAvailable' } }
/** Any unrecognised / missing status falls back to the "Unsupported" template. */
export const Unsupported: Story = { args: { status: undefined } }
