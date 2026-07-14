import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReplicaStatusBadge } from '../../../components/status-badges/replica-status-badge'

const statuses = ['Pending', 'Failed', 'Failing', 'Succeeded', 'Running', 'Starting', 'Stopped', 'Terminated'] as const

const meta = {
  title: 'Components/Status Badges/Replica',
  component: ReplicaStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof ReplicaStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = { args: { status: 'Pending' } }
export const Failed: Story = { args: { status: 'Failed' } }
export const Failing: Story = { args: { status: 'Failing' } }
export const Succeeded: Story = { args: { status: 'Succeeded' } }
export const Running: Story = { args: { status: 'Running' } }
export const Starting: Story = { args: { status: 'Starting' } }
export const Stopped: Story = { args: { status: 'Stopped' } }
export const Terminated: Story = { args: { status: 'Terminated' } }
