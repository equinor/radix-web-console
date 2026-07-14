import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { ConfigureDeployKey } from '../../components/configure-application-github/configure-deploy-key'
import { ConfigureGitHubWebhook } from '../../components/configure-application-github/configure-git-hub-webhook'

// This story composes two sibling components, so its args are the union of
// both components' props and the render consumes them (controls drive both).
type Args = ComponentProps<typeof ConfigureDeployKey> & ComponentProps<typeof ConfigureGitHubWebhook>

/**
 * Onboarding guide shown when connecting an application to GitHub. It composes two
 * sibling steps: adding a deploy key (`ConfigureDeployKey`) so Radix can clone the
 * repository, and adding a webhook (`ConfigureGitHubWebhook`) so pushes trigger builds.
 */
const meta = {
  title: 'Components/ConfigureApplicationGithub',
  component: ConfigureDeployKey,
  tags: ['autodocs'],
  render: (args) => (
    <div className="o-layout-single">
      <ConfigureDeployKey app={args.app} deployKey={args.deployKey} />
      <ConfigureGitHubWebhook appName={args.appName} repository={args.repository} sharedSecret={args.sharedSecret} />
    </div>
  ),
  args: {
    app: {
      appId: 'a-app-id',
      adGroups: ['Group 1', 'Group 2'],
      adUsers: ['User 1', 'user 2'],
      readerAdGroups: ['Reader 1', 'Reader 2'],
      readerAdUsers: ['Reader User 1', 'Reader User 2'],
      name: 'a-name-thing',
      repository: 'https://some/path/to/a/repo',
      sharedSecret: 'a long shared secret',
      configBranch: 'configBranch',
      creator: 'creator',
      owner: 'owner',
      radixConfigFullName: 'radixconfig.yaml',
    },
    appName: 'a-name-thing',
    repository: 'https://some/path/to/a/repo',
    sharedSecret: crypto.randomUUID(),
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
