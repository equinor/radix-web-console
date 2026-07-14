import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  EnvironmentCardLayout,
  type EnvironmentCardLayoutProps,
} from '../../components/environments-summary/environment-card'
import { URL_VAR_NAME } from '../../components/environments-summary/environment-ingress'

const deploymentName = 'prod-abcd-1234'
const activeFrom = '2023-06-01T12:00:00Z'

const webComponent: NonNullable<EnvironmentCardLayoutProps['components']>[number] = {
  name: 'web',
  image: 'ghcr.io/equinor/radix-api:latest',
  type: 'component',
  status: 'Consistent',
  variables: { [URL_VAR_NAME]: 'radix-api.example.com' },
  replicaList: [
    {
      type: 'ComponentReplica',
      name: 'web-abcd-1',
      created: activeFrom,
      replicaStatus: { status: 'Running' },
    },
  ],
}

/** Resource utilization scoped to the `prod` environment (matches `env.name`). */
const utilization = (cpuAverage: number, memoryMaximum: number): EnvironmentCardLayoutProps['utilization'] => ({
  environments: {
    prod: {
      components: {
        web: {
          replicas: {
            'web-abcd-1': {
              cpuAverage,
              cpuRequests: 1,
              memoryMaximum,
              memoryRequests: 1000,
            },
          },
        },
      },
    },
  },
})

const vulnerabilities = (summary: {
  critical: number
  high: number
  medium: number
  low: number
}): EnvironmentCardLayoutProps['envScan'] => ({
  name: 'prod',
  components: {
    web: {
      image: 'radix-api:latest',
      scanSuccess: true,
      scanTime: activeFrom,
      vulnerabilitySummary: summary,
    },
  },
})

const baseArgs: EnvironmentCardLayoutProps = {
  appName: 'radix-api',
  repository: 'https://github.com/equinor/radix-api',
  isLoading: false,
  env: {
    name: 'prod',
    status: 'Consistent',
    branchMapping: 'release',
    activeDeployment: {
      name: deploymentName,
      environment: 'prod',
      activeFrom,
      status: 'Ready',
    },
  },
  deployment: { name: deploymentName, activeFrom, status: 'Ready' },
  components: [webComponent],
  utilization: utilization(0.4, 400),
}

const meta = {
  title: 'Components/Environment Card',
  component: EnvironmentCardLayout,
  tags: ['autodocs'],
  args: baseArgs,
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
