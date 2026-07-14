import { Icon } from '@equinor/eds-core-react'
import { coffee } from '@equinor/eds-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadgeTemplate } from '../../components/status-badges/status-badge-template'

/** Presentational badge primitive: a colored chip with an optional icon and label. All status badges render through this template. */
const meta = {
  title: 'Components/Status Badges/Template',
  component: StatusBadgeTemplate,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'none'] },
  },
} satisfies Meta<typeof StatusBadgeTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Default', type: 'default' },
}

export const Success: Story = {
  args: { children: 'Success', type: 'success' },
}

export const Warning: Story = {
  args: { children: 'Warning', type: 'warning' },
}

export const Danger: Story = {
  args: { children: 'Danger', type: 'danger' },
}

export const None: Story = {
  args: { children: 'None', type: 'none' },
}

export const WithIcon: Story = {
  args: { children: 'Coffee', type: 'success', icon: <Icon data={coffee} /> },
}

/** With only an icon and no text, the badge is centered. */
export const IconOnly: Story = {
  args: { type: 'default', icon: <Icon data={coffee} /> },
}
