import { coffee } from '@equinor/eds-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { GenericBadgeTemplates, GenericStatusBadge } from './generic-status-badge'

const types = Object.keys(GenericBadgeTemplates)

/**
 * Low-level, reusable status badge driven by a `type` (which controls the color and
 * default icon) and free-form `children` label. It is the building block the more
 * specific status badges are built on, and accepts a `customIconData` override.
 */
const meta = {
  title: 'Primitives/Status Badges/Generic',
  component: GenericStatusBadge,
  tags: ['autodocs'],
  args: { children: 'Label' },
  argTypes: {
    type: { control: 'select', options: types },
    customIconData: { control: false },
  },
} satisfies Meta<typeof GenericStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = { args: { type: 'running', children: 'Running' } }
export const Danger: Story = { args: { type: 'danger', children: 'Danger' } }
export const Failed: Story = { args: { type: 'failed', children: 'Failed' } }
export const Queued: Story = { args: { type: 'queued', children: 'Queued' } }
export const Waiting: Story = { args: { type: 'waiting', children: 'Waiting' } }
export const Stopped: Story = { args: { type: 'stopped', children: 'Stopped' } }
export const StoppedNoChanges: Story = { args: { type: 'stoppednochanges', children: 'Stopped (no changes)' } }
export const Success: Story = { args: { type: 'success', children: 'Success' } }
export const Succeeded: Story = { args: { type: 'succeeded', children: 'Succeeded' } }
export const Unknown: Story = { args: { type: 'unknown', children: 'Unknown' } }
export const Warning: Story = { args: { type: 'warning', children: 'Warning' } }
export const CustomIcon: Story = { args: { type: 'danger', customIconData: coffee, children: 'Coffee' } }
