import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComponentSecretBadgeTemplates, ComponentSecretStatusBadge } from './component-secret-status-badge'

const statuses = Object.keys(ComponentSecretBadgeTemplates)

/** Badge that shows the status of a component secret (Consistent, Pending or NotAvailable), falling back to "Unsupported". */
const meta = {
  title: 'Primitives/Status Badges/Component Secret',
  component: ComponentSecretStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof ComponentSecretStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = { args: { status: 'Pending' } }
export const Consistent: Story = { args: { status: 'Consistent' } }
export const NotAvailable: Story = { args: { status: 'NotAvailable' } }
/** Any unrecognised / missing status falls back to the "Unsupported" template. */
export const Unsupported: Story = { args: { status: undefined } }
