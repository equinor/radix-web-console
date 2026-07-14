import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alerting } from '../../components/alerting'

/** UI for enabling and configuring Slack alerting for an application environment, covering the enable/ready/configured flow. */
const meta = {
  title: 'Components/Alerting',
  component: Alerting,
  tags: ['autodocs'],
} satisfies Meta<typeof Alerting>

export default meta
type Story = StoryObj<typeof meta>

const noopFunc = async () => {}

export const NotEnabled: Story = {
  args: {
    isSaving: false,
    alertingConfig: { enabled: false, ready: false },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
}

export const EnabledNotReady: Story = {
  args: {
    isSaving: false,
    alertingConfig: { enabled: true, ready: false },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
}

export const EnabledReadyNotConfigured: Story = {
  args: {
    isSaving: false,
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: false } },
      },
    },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
}

export const EnabledReadyConfigured: Story = {
  args: {
    isSaving: false,
    alertingConfig: {
      enabled: true,
      ready: true,
      receiverSecretStatus: {
        slack1: { slackConfig: { webhookUrlConfigured: true } },
      },
    },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
}
