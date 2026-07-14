import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  JobSubPipelineStepConditionBadgeTemplates,
  RadixJobSubPipelineStepConditionBadge,
} from '../../../components/status-badges/radix-job-subpipeline-step-condition-badge'

type Status = React.ComponentProps<typeof RadixJobSubPipelineStepConditionBadge>['status']

const statuses = Object.keys(JobSubPipelineStepConditionBadgeTemplates) as Array<Status>

/** Badge that shows the condition of a single Tekton sub-pipeline step within a Radix job (Waiting, Running, Succeeded, Failed). */
const meta = {
  title: 'Components/Status Badges/Radix Job Sub-Pipeline Step',
  component: RadixJobSubPipelineStepConditionBadge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: statuses },
  },
  args: {
    status: 'Running',
  },
} satisfies Meta<typeof RadixJobSubPipelineStepConditionBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Waiting: Story = { args: { status: 'Waiting' } }
export const Running: Story = { args: { status: 'Running' } }
export const Succeeded: Story = { args: { status: 'Succeeded' } }
export const Failed: Story = { args: { status: 'Failed' } }

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
