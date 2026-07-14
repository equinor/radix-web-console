import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComponentSecretStatusBadge } from '../../../components/status-badges/component-secret-status-badge'

const statuses = ['Pending', 'Consistent', 'NotAvailable'] as const

const meta = {
  title: 'Components/Status Badges/Component Secret',
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
