import type { Meta, StoryObj } from '@storybook/react-vite'
import { JobsList } from '.'
import { mockedJobs } from './jobs-list.mock'

/** Sortable table of an application's pipeline jobs across every status and pipeline type, with an optional row `limit`. */
const meta = {
  title: 'Data Display/Jobs List',
  component: JobsList,
  tags: ['autodocs'],
  args: {
    appName: 'radix-web-console',
    jobs: mockedJobs,
  },
} satisfies Meta<typeof JobsList>

export default meta
type Story = StoryObj<typeof meta>

/** Latest pipeline jobs across every status and pipeline type. The Date/Time, Environment and Pipeline column headers are sortable. */
export const Default: Story = {}

/** Only the most recent jobs, capped with the `limit` prop. */
export const Limited: Story = {
  args: {
    limit: 3,
  },
}

/** No jobs yet — prompts the user to push to GitHub to trigger one. */
export const Empty: Story = {
  args: {
    jobs: [],
  },
}
