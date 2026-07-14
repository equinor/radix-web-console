import { Button, Typography } from '@equinor/eds-core-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from '../../components/alert'

/** Inline alert/notice with an intent `type` (info, success, warning, danger), optional actions and rich children. */
const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is the description of the alert. It can be short or long.',
  },
}

export const Info: Story = {
  args: {
    children: 'This is the description of the alert. It can be short or long.',
    type: 'info',
  },
}

export const Success: Story = {
  args: {
    children: 'This is the description of the alert. It can be short or long.',
    type: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'This is the description of the alert. It can be short or long.',
    type: 'warning',
  },
}
export const Danger: Story = {
  args: {
    children: 'This is the description of the alert. It can be short or long.',
    type: 'danger',
  },
}

export const WithActions: Story = {
  render: () => (
    <Alert actions={<Button>Click me</Button>}>
      An Alert can provide actions for the user. This Alert has one button.
    </Alert>
  ),
}

export const WithLink: Story = {
  render: () => (
    <Alert>
      An Alert can also render different tags inside it's children. This is a{' '}
      <Typography link href="/">
        link
      </Typography>
    </Alert>
  ),
}

export const WithMultipleChildren: Story = {
  render: () => (
    <Alert type="danger">
      <Typography variant="h4">That didn't work 😞</Typography>
      <div>
        Error subscribing to resource <code>some_resource</code> with parameters <code>some_parameter</code>,{' '}
        <code>some_other_parameter</code>, <code>another_parameter</code>
      </div>
      <div>
        The error message was <samp>some_error_msg</samp>
      </div>
      <div>
        You may want to refresh the page. If the problem persists, get in touch on our Slack{' '}
        <Typography link>support channel</Typography>
      </div>
    </Alert>
  ),
}

/**
 * TODO: Is there something wrong with this component? When adding actions, while providing multiple children,
 * it wraps weirdly.
 */
export const FullStory: Story = {
  render: () => (
    <Alert type="danger" actions={<Button>Click me</Button>}>
      <Typography variant="h4">That didn't work 😞</Typography>
      <div>
        Error subscribing to resource <code>some_resource</code> with parameters <code>some_parameter</code>,{' '}
        <code>some_other_parameter</code>, <code>another_parameter</code>
      </div>
      <div>
        The error message was <samp>some_error_msg</samp>
      </div>
      <div>
        You may want to refresh the page. If the problem persists, get in touch on our Slack{' '}
        <Typography link>support channel</Typography>
      </div>
    </Alert>
  ),
}
