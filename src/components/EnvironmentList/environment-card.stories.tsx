import type { Meta, StoryObj } from '@storybook/react-vite'
import { EnvironmentCardLayout } from './environment-card'
import { activeFrom, consistentBaseArgs, deploymentName, utilization, vulnerabilities } from './environment-card.mock'

/** Summary card for a single application environment: its status, active deployment, components, resource utilization and vulnerabilities. */
const meta = {
  title: 'Data Display/Environment Card',
  component: EnvironmentCardLayout,
  tags: ['autodocs'],
  args: consistentBaseArgs,
} satisfies Meta<typeof EnvironmentCardLayout>

export default meta
type Story = StoryObj<typeof meta>

/** Healthy environment: a running component with a public ingress and an active deployment. */
export const Consistent: Story = {}

/** Data is still being fetched — the header shows a loading spinner. */
export const Loading: Story = {
  args: { isLoading: true },
}

/** Deployment built from a git tag, linking back to the repository. */
export const WithGitTags: Story = {
  args: {
    deployment: { name: deploymentName, activeFrom, gitTags: 'v1.0.0', status: 'Ready' },
  },
}

/** An orphaned environment (no longer mapped to a branch) shows the "Orphan environment" note. */
export const Orphan: Story = {
  args: {
    env: {
      name: 'prod',
      status: 'Orphan',
      activeDeployment: {
        name: deploymentName,
        environment: 'prod',
        activeFrom,
        status: 'Ready',
      },
    },
  },
}

/** Critical and high vulnerabilities surface the vulnerability indicator in the header. */
export const WithVulnerabilities: Story = {
  args: {
    envScan: vulnerabilities({ critical: 2, high: 1, medium: 4, low: 8 }),
  },
}

/** CPU and memory close to their limits raise the utilization severity. */
export const HighUtilization: Story = {
  args: {
    utilization: utilization(0.95, 950),
  },
}

/** No active deployment and no branch mapping: "No active deployment" and "Not built automatically". */
export const NotBuiltAutomatically: Story = {
  args: {
    env: { name: 'prod', status: 'Pending' },
    deployment: undefined,
    components: [],
    utilization: undefined,
  },
}
