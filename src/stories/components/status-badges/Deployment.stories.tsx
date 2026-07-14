import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeploymentStatusBadge } from '../../../components/status-badges/deployment-status-badge'

const statuses = ['Reconciling', 'Failed', 'Inactive', 'Ready'] as const

const meta = {
  title: 'Components/Status Badges/Deployment',
  component: DeploymentStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof DeploymentStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Reconciling: Story = { args: { status: 'Reconciling' } }
export const Failed: Story = { args: { status: 'Failed' } }
export const Inactive: Story = { args: { status: 'Inactive' } }
export const Ready: Story = { args: { status: 'Ready' } }
