import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalDNSStatusBadge } from '../../../components/status-badges/external-dns-status-badge'

const statuses = ['Pending', 'Consistent', 'Invalid'] as const

const meta = {
  title: 'Components/Status Badges/External DNS',
  component: ExternalDNSStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof ExternalDNSStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = { args: { status: 'Pending' } }
export const Consistent: Story = { args: { status: 'Consistent' } }
export const Invalid: Story = { args: { status: 'Invalid' } }
