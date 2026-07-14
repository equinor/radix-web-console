import type { Meta, StoryObj } from '@storybook/react-vite'
import { BadgeTemplates, PipelineRunStatusBadge } from '../../../components/status-badges/pipeline-run-status-badge'

type Status = React.ComponentProps<typeof PipelineRunStatusBadge>['status']

const statuses = Object.keys(BadgeTemplates) as Array<Status>

const meta = {
  title: 'Components/Status Badges/Pipeline Run',
  component: PipelineRunStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof PipelineRunStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

// This badge maps ~60 Tekton statuses onto a handful of visuals. The named
// stories below cover each distinct visual; the Playground and AllStatuses
// stories let you inspect every individual status without 60 sidebar entries.
export const Running: Story = { args: { status: 'Running' } }
export const Started: Story = { args: { status: 'Started' } }
export const Succeeded: Story = { args: { status: 'Succeeded' } }
export const Failed: Story = { args: { status: 'Failed' } }
export const Cancelled: Story = { args: { status: 'Cancelled' } }
export const Pending: Story = { args: { status: 'PipelineRunPending' } }

/** Pick any of the ~60 statuses from the control. */
export const Playground: Story = { args: { status: 'Running' } }

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
