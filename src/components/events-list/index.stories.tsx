import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventsList } from '.'
import { mockedEvents } from './event-list.mock'

/** Collapsible table of Radix/Kubernetes events, used to surface warnings and activity for a resource. */
const meta = {
  title: 'Data Display/Event List',
  component: EventsList,
  tags: ['autodocs'],
} satisfies Meta<typeof EventsList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    events: mockedEvents,
    isExpanded: false,
  },
}

export const Empty: Story = {
  args: {
    events: [],
    isExpanded: true,
  },
}

export const DefaultCollapsed: Story = {
  args: {
    events: mockedEvents,
    isExpanded: false,
  },
}

export const DefaultExpanded: Story = {
  args: {
    events: [mockedEvents[0]],
    isExpanded: true,
  },
}
