import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComponentBadgeTemplates, ComponentStatusBadge } from '../../../components/status-badges/component-status-badge'

const statuses = Object.keys(ComponentBadgeTemplates)

/** Badge that shows the reconciliation state of an application component (e.g. Consistent, Reconciling, Outdated). */
const meta = {
  title: 'Components/Status Badges/Component',
  component: ComponentStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof ComponentStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Reconciling: Story = { args: { status: 'Reconciling' } }
export const Restarting: Story = { args: { status: 'Restarting' } }
export const Stopped: Story = { args: { status: 'Stopped' } }
export const Outdated: Story = { args: { status: 'Outdated' } }
export const Consistent: Story = { args: { status: 'Consistent' } }
