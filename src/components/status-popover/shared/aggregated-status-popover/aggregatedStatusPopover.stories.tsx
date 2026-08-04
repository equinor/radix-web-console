import { Icon } from '@equinor/eds-core-react'
import { check, error_outlined, warning_outlined } from '@equinor/eds-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AggregatedStatusPopover } from './AggregatedStatusPopover'

/**
 * Renders a status badge for a list of items, using the most severe alert level as the aggregated
 * status. Hovering the badge opens a popover listing every item with its individual status. Renders
 * nothing when the item list is empty.
 */
const meta = {
  title: 'Primitives/AggregatedStatusPopover',
  component: AggregatedStatusPopover,
  tags: ['autodocs'],
} satisfies Meta<typeof AggregatedStatusPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Good: Story = {
  args: {
    title: 'Environments',
    items: [
      { label: 'production', alertLevel: 'None', icon: <Icon data={check} /> },
      { label: 'staging', alertLevel: 'None', icon: <Icon data={check} /> },
    ],
  },
}

export const Warning: Story = {
  args: {
    title: 'Environments',
    items: [
      { label: 'production', alertLevel: 'None', icon: <Icon data={check} /> },
      { label: 'staging', alertLevel: 'Warning', icon: <Icon data={warning_outlined} /> },
    ],
  },
}

export const Danger: Story = {
  args: {
    title: 'Environments',
    items: [
      { label: 'production', alertLevel: 'Danger', icon: <Icon data={error_outlined} /> },
      { label: 'staging', alertLevel: 'Warning', icon: <Icon data={warning_outlined} /> },
      { label: 'development', alertLevel: 'None', icon: <Icon data={check} /> },
    ],
  },
}

/** With no items the component renders nothing. */
export const Empty: Story = {
  args: { title: 'Environments', items: [] },
}
