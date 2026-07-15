import type { EnvironmentCardLayoutProps } from '../../../components/environments-summary/environment-card'
import { URL_VAR_NAME } from '../../../components/environments-summary/environment-ingress'

export const deploymentName = 'prod-abcd-1234'
export const activeFrom = '2023-06-01T12:00:00Z'

/** Resource utilization scoped to the `prod` environment (matches `env.name`). */
export const utilization = (cpuAverage: number, memoryMaximum: number): EnvironmentCardLayoutProps['utilization'] => ({
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

export const vulnerabilities = (summary: {
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

/** Healthy environment: a running component with a public ingress and an active deployment. */
export const consistentBaseArgs: EnvironmentCardLayoutProps = {
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
  components: [
    {
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
    },
  ],
  utilization: utilization(0.4, 400),
}
