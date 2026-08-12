import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  mockEnvironmentStatusItems,
  mockReplicaUtilizations,
  mockVulnerabilities,
} from './components/environment-card-statuses/environmentCardStatuses.mock'
import { EnvironmentCard } from './EnvironmentCard'
import {
  mockActiveDeployment,
  mockAutomaticNotBuiltYetBuildSource,
  mockBuildSource,
  mockEnvironment,
  mockPromotedBuildSource,
  mockPromotedNotBuiltYetBuildSource,
  mockPublicComponents,
} from './environmentCard.mock'

/** Summarises a single application environment: public components, active deployment, build source and aggregated statuses. */
const meta = {
  title: 'Domain/Environment Card',
  component: EnvironmentCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <EnvironmentCard {...args}>
      <EnvironmentCard.Statuses
        replicaUtilizations={mockReplicaUtilizations}
        vulnerabilities={mockVulnerabilities}
        environmentStatusItems={mockEnvironmentStatusItems}
      />
    </EnvironmentCard>
  ),
} satisfies Meta<typeof EnvironmentCard>

export default meta
type Story = StoryObj<typeof meta>

/** Automatically built from a branch, with an active deployment, public components and statuses. */
export const Default: Story = {
  args: {
    environment: mockEnvironment,
    publicComponents: mockPublicComponents,
    activeDeployment: mockActiveDeployment,
    buildSource: mockBuildSource,
  },
}

/** Environment that no longer exists in radixconfig but still lives in the cluster. */
export const OrphanEnvironment: Story = {
  args: {
    ...Default.args,
    environment: { ...mockEnvironment, isOrphan: true },
  },
}

/** Deployment promoted from another environment rather than built from a branch. */
export const PromotedDeployment: Story = {
  args: {
    ...Default.args,
    buildSource: mockPromotedBuildSource,
  },
}

/** Branch mapping exists but nothing has been deployed yet. */
export const AutomaticNotBuiltYet: Story = {
  args: {
    ...Default.args,
    publicComponents: [],
    activeDeployment: undefined,
    buildSource: mockAutomaticNotBuiltYetBuildSource,
  },
}

/** No branch mapping — deployments arrive by promotion, and nothing has been promoted yet. */
export const PromotedNotBuiltYet: Story = {
  args: {
    ...Default.args,
    buildSource: mockPromotedNotBuiltYetBuildSource,
  },
}

/** Placeholder shown while component data is loading. */
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
}

/** Public components are automatically truncated when there are too many to display. */
export const WithLotsOfPublicComponents: Story = {
  args: {
    ...Default.args,
    publicComponents: [
      { name: 'web', url: 'https://web-radix-api-dev.radix.equinor.com' },
      { name: 'api', url: 'https://api-radix-api-dev.radix.equinor.com' },
      { name: 'docs', url: 'https://docs-radix-api-dev.radix.equinor.com' },
      { name: 'admin', url: 'https://admin-radix-api-dev.radix.equinor.com' },
      { name: 'metrics', url: 'https://metrics-radix-api-dev.radix.equinor.com' },
      { name: 'logs', url: 'https://logs-radix-api-dev.radix.equinor.com' },
      { name: 'monitoring', url: 'https://monitoring-radix-api-dev.radix.equinor.com' },
      { name: 'alerts', url: 'https://alerts-radix-api-dev.radix.equinor.com' },
      { name: 'tracing', url: 'https://tracing-radix-api-dev.radix.equinor.com' },
    ],
  },
}
