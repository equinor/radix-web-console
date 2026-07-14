import type { Meta, StoryObj } from '@storybook/react-vite'
import { TLSAutomationStatusBadge } from '../../../components/status-badges/tls-automation-status-badge'

const statuses = ['Pending', 'Success', 'Failed', 'Unknown'] as const

const meta = {
  title: 'Components/Status Badges/TLS Automation',
  component: TLSAutomationStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof TLSAutomationStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = { args: { status: 'Pending' } }
export const Success: Story = { args: { status: 'Success' } }
export const Failed: Story = { args: { status: 'Failed' } }
export const Unknown: Story = { args: { status: 'Unknown' } }
