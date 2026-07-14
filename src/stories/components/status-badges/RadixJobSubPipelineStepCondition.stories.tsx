import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  JobSubPipelineStepConditionBadgeTemplates,
  RadixJobSubPipelineStepConditionBadge,
} from '../../../components/status-badges/radix-job-subpipeline-step-condition-badge'

type Status = React.ComponentProps<typeof RadixJobSubPipelineStepConditionBadge>['status']

const statuses = Object.keys(JobSubPipelineStepConditionBadgeTemplates) as Array<Status>

const meta = {
  title: 'Components/Status Badges/Radix Job Sub-Pipeline Step',
  component: RadixJobSubPipelineStepConditionBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
} satisfies Meta<typeof RadixJobSubPipelineStepConditionBadge>

export default meta
type Story = StoryObj<typeof meta>

// Like Pipeline Run, this maps many statuses onto a few visuals. Named stories
// cover the distinct visuals; Playground and AllStatuses expose every status.
export const Waiting: Story = { args: { status: 'Waiting' } }
export const Running: Story = { args: { status: 'Running' } }
export const Succeeded: Story = { args: { status: 'Succeeded' } }
export const Failed: Story = { args: { status: 'Failed' } }

/** Pick any status from the control. */
export const Playground: Story = { args: { status: 'Running' } }

/** Every status rendered at once. */
export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
      {statuses.map((status) => (
        <RadixJobSubPipelineStepConditionBadge key={status} status={status} />
      ))}
    </div>
  ),
}
