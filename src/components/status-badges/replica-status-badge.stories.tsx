import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReplicaBadgeTemplates, ReplicaStatusBadge } from './replica-status-badge'

const statuses = Object.keys(ReplicaBadgeTemplates)

/** Badge that shows the runtime status of a single replica/pod (e.g. Running, Starting, Failing, Terminated). */
const meta = {
  title: 'Primitives/Status Badges/Replica',
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
