import type { Component, ReplicaResourcesUtilizationResponse } from '../../../../store/radix-api'
import type { EnvironmentVulnerabilities } from '../../../../store/scan-api'
import { getEnvironmentReplicaUtilizations } from '../../../status-popover/shared/utilization-status-popover/utilizationStatusPopover.utils'
import { summarizeEnvironmentVulnerabilities } from '../../../status-popover/shared/vulnerability-status-popover/vulnerabilityStatusPopover.utils'
import { getEnvironmentStatusItems } from './environmentCardStatuses.utils'

const APP_NAME = 'radix-api'

const createComponent = (name: string, host?: string): Component => ({
  name,
  image: `ghcr.io/equinor/${APP_NAME}-${name}:latest`,
  type: 'component',
  ...(host ? { variables: { RADIX_PUBLIC_DOMAIN_NAME: host } } : {}),
})

export const mockComponents: Component[] = [
  createComponent('web', 'web-radix-api-dev.radix.equinor.com'),
  createComponent('api', 'api-radix-api-dev.radix.equinor.com'),
  createComponent('admin', 'admin-radix-api-dev.radix.equinor.com'),
  createComponent('worker'),
]
const mockUtilization: ReplicaResourcesUtilizationResponse = {
  environments: {
    dev: {
      components: {
        web: {
          replicas: {
            'web-abcd-1': { cpuAverage: 0.4, cpuRequests: 1, memoryMaximum: 400, memoryRequests: 1000 },
          },
        },
      },
    },
  },
}

const mockEnvScan: EnvironmentVulnerabilities = {
  name: 'dev',
  components: {
    web: {
      image: 'ghcr.io/equinor/radix-api-web:latest',
      scanSuccess: true,
      scanTime: '2026-08-01T11:00:00Z',
      vulnerabilitySummary: { critical: 1, high: 3, medium: 5, low: 12 },
    },
  },
}

export const mockReplicaUtilizations = getEnvironmentReplicaUtilizations(mockUtilization, 'dev')
export const mockVulnerabilities = summarizeEnvironmentVulnerabilities(mockEnvScan)
export const mockEnvironmentStatusItems = getEnvironmentStatusItems(mockComponents, 'Ready')
