import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ApplyConfigPromptPanel } from './ApplyConfigPromptPanel'
import { mockApplication, mockFailedJob, mockRunningJob } from './applyConfigPromptPanel.mock'

/** Onboarding hero shown on the application overview until the Radix config has been applied. */
const meta = {
  title: 'Domain/Apply Config Prompt/Panel',
  component: ApplyConfigPromptPanel,
  tags: ['autodocs'],
  args: {
    application: mockApplication,
    onApplyConfig: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 920 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ApplyConfigPromptPanel>

export default meta
type Story = StoryObj<typeof meta>

/** No pipeline job has been run yet. */
export const NotStarted: Story = {
  args: {},
}

/** The user has clicked apply and the request is in flight. */
export const Applying: Story = {
  args: { isApplying: true },
}

/** An apply-config job is running; the button is disabled and the job is linked. */
export const InProgress: Story = {
  args: { latestJob: mockRunningJob },
}

/** The latest job failed, so the config was not applied. */
export const Failed: Story = {
  args: { latestJob: mockFailedJob },
}

/** Triggering the pipeline itself returned an error. */
export const TriggerError: Story = {
  args: {
    applyErrorMessage: 'Forbidden: you do not have access to trigger pipelines for this application.',
  },
}
