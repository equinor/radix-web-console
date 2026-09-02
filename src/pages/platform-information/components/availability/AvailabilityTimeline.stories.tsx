import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen, waitFor } from 'storybook/test'
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
  args: { days: mockPerfectUptime },
  play: async ({ canvas, userEvent, step }) => {
    const bar = canvas.getAllByRole('button')[0]
    const label = bar.getAttribute('aria-label') ?? ''

    await step('hovering a bar reveals its tooltip', async () => {
      await userEvent.hover(bar)
      const tooltip = await screen.findByRole('tooltip')
      await expect(tooltip).toBeVisible()
      await expect(tooltip).toHaveTextContent(label)

      await userEvent.unhover(bar)
      await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
    })

    await step('tabbing to a bar reveals its tooltip', async () => {
      await userEvent.tab()
      await expect(bar).toHaveFocus()
      const tooltip = await screen.findByRole('tooltip')
      await expect(tooltip).toBeVisible()
      await expect(tooltip).toHaveTextContent(label)
    })
  },
}

export const MixedUptime: Story = {
  args: { days: mockMixedUptime, onViewHistory: () => undefined },
}
