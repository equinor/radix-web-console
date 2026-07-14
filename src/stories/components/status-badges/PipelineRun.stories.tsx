import type { Meta, StoryObj } from '@storybook/react-vite'
import { BadgeTemplates, PipelineRunStatusBadge } from '../../../components/status-badges/pipeline-run-status-badge'

type Status = React.ComponentProps<typeof PipelineRunStatusBadge>['status']

const statuses = Object.keys(BadgeTemplates) as Array<Status>

/**
 * Badge for a Tekton `PipelineRun`. It maps ~60 Tekton statuses onto a handful of
 * visuals, so use the Playground/AllStatuses stories to inspect every individual status.
 */
const meta = {
  title: 'Components/Status Badges/Pipeline Run',
  component: PipelineRunStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
  args: { status: 'Running' },
} satisfies Meta<typeof PipelineRunStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = { args: { status: 'Running' } }
export const Started: Story = { args: { status: 'Started' } }
export const Succeeded: Story = { args: { status: 'Succeeded' } }
export const Failed: Story = { args: { status: 'Failed' } }
export const Cancelled: Story = { args: { status: 'Cancelled' } }
export const Pending: Story = { args: { status: 'PipelineRunPending' } }

/** Every status rendered at once. */
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
      {statuses.map((status) => (
        <PipelineRunStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
}
