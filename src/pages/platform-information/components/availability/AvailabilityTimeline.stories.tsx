import type { Meta, StoryObj } from '@storybook/react-vite'
import { AvailabilityTimeline } from './AvailabilityTimeline'
import { mockMixedUptime, mockPerfectUptime } from './availabilityTimeline.mock'

/** Status-page style strip showing daily availability, one bar per day. */
const meta = {
  title: 'Data Display/Availability Timeline',
  component: AvailabilityTimeline,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AvailabilityTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const PerfectUptime: Story = {
  args: { availabilitySummary: 100, days: mockPerfectUptime },
}

export const MixedUptime: Story = {
  args: { availabilitySummary: 96.5, days: mockMixedUptime, onViewHistory: () => undefined },
}
