import { Icon } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusPopover } from '../../components/status-popover/status-popover'

/** A colored status chip that reveals additional detail in a popover on hover/click; the popover can be disabled. */
const meta = {
  title: 'Components/StatusPopover',
  component: StatusPopover,
  tags: ['autodocs'],
} satisfies Meta<typeof StatusPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Title inside popover',
    icon: <Icon data={info_circle} />,
    type: 'default',
    label: 'Label',
    children: 'Content inside popover',
  },
}

export const Success: Story = {
  args: {
    title: 'Title inside popover',
    icon: <Icon data={info_circle} />,
    type: 'success',
    label: 'Label',
    children: 'Content inside popover',
  },
}

export const Warning: Story = {
  args: {
    title: 'Title inside popover',
    icon: <Icon data={info_circle} />,
    type: 'warning',
    label: 'Label',
    children: 'Content inside popover',
  },
}

export const Danger: Story = {
  args: {
    title: 'Title inside popover',
    icon: <Icon data={info_circle} />,
    type: 'danger',
    label: 'Label',
    children: 'Content inside popover',
  },
}

/**
 * The popover is still rendered, but the chip is not colored.
 */
export const None: Story = {
  args: {
    title: 'Title inside popover',
    icon: <Icon data={info_circle} />,
    type: 'none',
    label: 'Label',
    children: 'Content inside popover',
  },
}

/**
 * This doesnt provide a popover, but the chip is still rendered.
 */
export const DisabledPopover: Story = {
  args: {
    title: 'Title inside popover',
    icon: <Icon data={info_circle} />,
    type: 'default',
    label: 'Label',
    disablePopover: true,
    children: 'Content inside popover',
  },
}
