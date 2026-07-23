import { Button, Typography } from '@equinor/eds-core-react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Banner } from './Banner'

/**
 * A banner that displays a prominent message with an optional title, actions, and dismiss button.
 *
 * Compose the content using the `Banner.Title`, `Banner.Message` and `Banner.Actions` subcomponents.
 *
 * This component is temporary and will be substituted with EDS Banner when it is available.
 */
const meta = {
  title: 'Primitives/Banner',
  component: Banner,
  subcomponents: {
    'Banner.Title': Banner.Title,
    'Banner.Message': Banner.Message,
    'Banner.Actions': Banner.Actions,
  },
  tags: ['autodocs'],
  argTypes: {
    // `children` is composed with the Banner.* subcomponents, so hide it from the controls table.
    children: { control: false },
  },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Banner {...args}>
      <Banner.Message>This is the default banner</Banner.Message>
    </Banner>
  ),
}

export const WarningBanner: Story = {
  args: { variant: 'warning' },
  render: (args) => (
    <Banner {...args}>
      <Banner.Message>This is a warning banner</Banner.Message>
    </Banner>
  ),
}

export const WithDismiss: Story = {
  args: { onDismiss: () => alert('Banner dismissed') },
  render: (args) => (
    <Banner {...args}>
      <Banner.Message>You can dismiss this banner.</Banner.Message>
    </Banner>
  ),
}

export const WithTitle: Story = {
  render: (args) => (
    <Banner {...args}>
      <Banner.Title>Banner title</Banner.Title>
      <Banner.Message>This banner has a title above the message.</Banner.Message>
    </Banner>
  ),
}

export const WithActions: Story = {
  render: (args) => (
    <Banner {...args}>
      <Banner.Title>Action required</Banner.Title>
      <Banner.Message>A banner can provide actions for the user to take.</Banner.Message>
      <Banner.Actions>
        <Button onClick={() => alert('Confirmed')}>Confirm</Button>
        <Button onClick={() => alert('Denied')}>Deny</Button>
      </Banner.Actions>
    </Banner>
  ),
}

export const WithLink: Story = {
  args: { variant: 'warning' },
  render: (args) => (
    <Banner {...args}>
      <Banner.Title>Action required</Banner.Title>
      <Banner.Message>
        Please review the{' '}
        <Typography link href="/" color="inherit">
          documentation
        </Typography>{' '}
        before continuing.
      </Banner.Message>
    </Banner>
  ),
}

export const FullStory: Story = {
  args: { variant: 'warning', onDismiss: () => alert('Banner dismissed') },
  render: (args) => (
    <Banner {...args} variant="warning" onDismiss={() => alert('Banner dismissed')}>
      <Banner.Title>Action required: Cluster migration</Banner.Title>
      <Banner.Message>
        We're migrating to a new cluster. Update your radixconfig before 1 January 2027 to keep your applications
        running. Applications that aren't updated will stop working. See the{' '}
        <Typography link href="/" target="_blank" rel="noopener noreferrer" color="inherit">
          migration guide
        </Typography>{' '}
        for details.
      </Banner.Message>
      <Banner.Actions>
        <Button onClick={() => alert('I have updated my configuration')}>I have updated my configuration</Button>
      </Banner.Actions>
    </Banner>
  ),
}
