import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alerting } from '../../components/alerting'

const meta = {
  title: 'Components/Alerting',
  component: Alerting,
  tags: ['autodocs'],
} satisfies Meta<typeof Alerting>

export default meta
type Story = StoryObj<typeof meta>

const noopFunc = async () => {}

const NotEnabled: Story = {
  args: {
    isSaving: false,
    alertingConfig: { enabled: false, ready: false },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
}

const EnabledNotReady: Story = {
  args: {
    isSaving: false,
    alertingConfig: { enabled: true, ready: false },
    disableAlerting: noopFunc,
    enableAlerting: noopFunc,
    updateAlerting: noopFunc,
  },
}

const EnabledReadyNotConfigured: Story = {
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

const EnabledReadyConfigured: Story = {
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

const EnabledReadyConfigured2: Story = {
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

export { NotEnabled, EnabledNotReady, EnabledReadyNotConfigured, EnabledReadyConfigured, EnabledReadyConfigured2 }
