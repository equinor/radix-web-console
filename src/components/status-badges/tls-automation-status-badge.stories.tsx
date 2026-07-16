import type { Meta, StoryObj } from '@storybook/react-vite'
import { TLSAutomationBadgeTemplates, TLSAutomationStatusBadge } from './tls-automation-status-badge'

const statuses = Object.keys(TLSAutomationBadgeTemplates)

/** Badge that shows the state of automated (ACME) TLS certificate provisioning (Pending, Success, Failed or Unknown). */
const meta = {
  title: 'Primitives/Status Badges/TLS Automation',
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
