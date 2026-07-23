import type { Meta, StoryObj } from '@storybook/react-vite'
import { JobConditionBadgeTemplates, RadixJobConditionBadge } from './radix-job-condition-badge'

const statuses = Object.keys(JobConditionBadgeTemplates)

/** Badge that shows the condition of a Radix pipeline job (e.g. Queued, Running, Succeeded, Failed). */
const meta = {
  title: 'Primitives/Status Badges/Radix Job Condition',
  component: RadixJobConditionBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof RadixJobConditionBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Waiting: Story = { args: { status: 'Waiting' } }
export const Queued: Story = { args: { status: 'Queued' } }
export const Running: Story = { args: { status: 'Running' } }
export const Succeeded: Story = { args: { status: 'Succeeded' } }
export const Completed: Story = { args: { status: 'Completed' } }
export const Stopping: Story = { args: { status: 'Stopping' } }
export const Stopped: Story = { args: { status: 'Stopped' } }
/** `Active` renders with the label "Starting". */
export const Active: Story = { args: { status: 'Active' } }
export const StoppedNoChanges: Story = { args: { status: 'StoppedNoChanges' } }
export const Failed: Story = { args: { status: 'Failed' } }
