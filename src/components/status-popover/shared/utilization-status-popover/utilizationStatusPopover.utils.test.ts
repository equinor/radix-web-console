import { describe, expect, it } from 'vitest'
import type { ReplicaResourcesUtilizationResponse, ReplicaUtilization } from '../../../../store/radix-api'
import {
  getApplicationReplicaUtilizations,
  getEnvironmentReplicaUtilizations,
  getHighestCPUAlert,
  getHighestMemoryAlert,
  getHighestSeverity,
  isSeverityAtLeast,
} from './utilizationStatusPopover.utils'
import type { SeverityWithReason } from './utilizationStatusPopover.types'

const replica = (overrides: Partial<ReplicaUtilization> = {}): ReplicaUtilization => ({
  cpuAverage: 0,
  cpuRequests: 1,
  memoryMaximum: 0,
  memoryRequests: 1,
  ...overrides,
})

const response: ReplicaResourcesUtilizationResponse = {
  environments: {
    prod: {
      components: {
        web: { replicas: { 'web-0': replica({ cpuAverage: 0.9 }), 'web-1': replica({ cpuAverage: 0.1 }) } },
      },
    },
    dev: {
      components: {
        api: { replicas: { 'api-0': replica({ memoryMaximum: 0.95 }) } },
      },
    },
  },
}

describe('getApplicationReplicaUtilizations', () => {
  it('returns every replica across all environments', () => {
    expect(getApplicationReplicaUtilizations(response)).toHaveLength(3)
  })

  it('returns an empty array for undefined data', () => {
    expect(getApplicationReplicaUtilizations(undefined)).toEqual([])
  })
})

describe('getEnvironmentReplicaUtilizations', () => {
  it('returns only the replicas belonging to the given environment', () => {
    expect(getEnvironmentReplicaUtilizations(response, 'prod')).toHaveLength(2)
    expect(getEnvironmentReplicaUtilizations(response, 'dev')).toHaveLength(1)
  })

  it('returns an empty array for an unknown environment', () => {
    expect(getEnvironmentReplicaUtilizations(response, 'missing')).toEqual([])
  })

  it('matches the environment name exactly, not as a prefix (e.g. "prod" excludes "production")', () => {
    const data: ReplicaResourcesUtilizationResponse = {
      environments: {
        prod: { components: { web: { replicas: { 'web-0': replica() } } } },
        production: { components: { web: { replicas: { 'web-0': replica() } } } },
      },
    }
    expect(getEnvironmentReplicaUtilizations(data, 'prod')).toHaveLength(1)
  })
})

describe('getHighestSeverity', () => {
  const severity = (severity: SeverityWithReason['severity']): SeverityWithReason => ({ severity, value: 0, reason: '' })

  it('returns the more severe of the two', () => {
    expect(getHighestSeverity(severity('Warning'), severity('Critical')).severity).toBe('Critical')
    expect(getHighestSeverity(severity('Critical'), severity('None')).severity).toBe('Critical')
  })
})

describe('isSeverityAtLeast', () => {
  it('compares severities by rank', () => {
    expect(isSeverityAtLeast('Critical', 'Warning')).toBe(true)
    expect(isSeverityAtLeast('Warning', 'Warning')).toBe(true)
    expect(isSeverityAtLeast('Information', 'Warning')).toBe(false)
  })
})

describe('getHighestCPUAlert', () => {
  it("returns 'None' for an empty list", () => {
    expect(getHighestCPUAlert([]).severity).toBe('None')
  })

  it('flags a replica above the max threshold as Critical', () => {
    expect(getHighestCPUAlert([replica({ cpuAverage: 1.5, cpuRequests: 1 })]).severity).toBe('Critical')
  })

  it('flags a replica above the high threshold as Warning', () => {
    expect(getHighestCPUAlert([replica({ cpuAverage: 0.85, cpuRequests: 1 })]).severity).toBe('Warning')
  })

  it('flags a replica below the low threshold as Information', () => {
    expect(getHighestCPUAlert([replica({ cpuAverage: 0.1, cpuRequests: 1 })]).severity).toBe('Information')
  })

  it('returns the most severe alert across replicas', () => {
    const alert = getHighestCPUAlert([
      replica({ cpuAverage: 0.5, cpuRequests: 1 }),
      replica({ cpuAverage: 1.5, cpuRequests: 1 }),
    ])
    expect(alert.severity).toBe('Critical')
  })

  it('includes the percent of requested in the reason', () => {
    expect(getHighestCPUAlert([replica({ cpuAverage: 0.85, cpuRequests: 1 })]).reason).toContain('85% of requested')
  })
})

describe('getHighestMemoryAlert', () => {
  it('flags a replica above the memory max threshold as Critical', () => {
    expect(getHighestMemoryAlert([replica({ memoryMaximum: 0.95, memoryRequests: 1 })]).severity).toBe('Critical')
  })

  it('flags a replica above the memory high threshold as Warning', () => {
    expect(getHighestMemoryAlert([replica({ memoryMaximum: 0.75, memoryRequests: 1 })]).severity).toBe('Warning')
  })
})
