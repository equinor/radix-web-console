import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBadgeTemplates, ProgressStatusBadge } from './progress-status-badge'

const statuses = Object.keys(ProgressBadgeTemplates)

/** Badge that shows the progress state of a running task (e.g. Running, Succeeded, Failed, Stopped). */
const meta = {
  title: 'Primitives/Status Badges/Progress',
  component: ProgressStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof ProgressStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = { args: { status: 'Running' } }
/** `Active` renders with the label "Starting". */
export const Active: Story = { args: { status: 'Active' } }
export const Succeeded: Story = { args: { status: 'Succeeded' } }
export const Completed: Story = { args: { status: 'Completed' } }
export const Failed: Story = { args: { status: 'Failed' } }
export const Waiting: Story = { args: { status: 'Waiting' } }
export const Stopping: Story = { args: { status: 'Stopping' } }
export const Stopped: Story = { args: { status: 'Stopped' } }
