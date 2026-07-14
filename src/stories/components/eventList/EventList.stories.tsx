import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventsList } from '../../../components/events-list'
import { mockedEvents } from './eventList.mock'

/** Collapsible table of Radix/Kubernetes events, used to surface warnings and activity for a resource. */
const meta = {
  title: 'Components/EventList',
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
