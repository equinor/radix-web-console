import { describe, expect, it } from 'vitest'
import type { ReplicaResourcesUtilizationResponse, ReplicaUtilization } from '../../../../store/radix-api'
import type { SeverityWithReason } from './utilizationStatusPopover.types'
import {
  getApplicationReplicaUtilizations,
  getEnvironmentReplicaUtilizations,
  getHighestCPUAlert,
  getHighestMemoryAlert,
  getHighestSeverity,
  isSeverityAtLeast,
} from './utilizationStatusPopover.utils'

const mockReplica = (overrides: Partial<ReplicaUtilization> = {}): ReplicaUtilization => ({
  cpuAverage: 0,
  cpuRequests: 1,
  memoryMaximum: 0,
  memoryRequests: 1,
  ...overrides,
})

const apiResponse: ReplicaResourcesUtilizationResponse = {
  environments: {
    prod: {
      components: {
        web: { replicas: { 'web-0': mockReplica({ cpuAverage: 0.9 }), 'web-1': mockReplica({ cpuAverage: 0.1 }) } },
      },
    },
    dev: {
      components: {
        api: { replicas: { 'api-0': mockReplica({ memoryMaximum: 0.95 }) } },
      },
    },
  },
}

describe('getApplicationReplicaUtilizations', () => {
  it('returns every replica across all environments', () => {
    expect(getApplicationReplicaUtilizations(apiResponse)).toHaveLength(3)
  })

  it('returns an empty array for undefined data', () => {
    expect(getApplicationReplicaUtilizations(undefined)).toEqual([])
  })
})

describe('getEnvironmentReplicaUtilizations', () => {
  it('returns only the replicas belonging to the given environment', () => {
    expect(getEnvironmentReplicaUtilizations(apiResponse, 'prod')).toHaveLength(2)
    expect(getEnvironmentReplicaUtilizations(apiResponse, 'dev')).toHaveLength(1)
  })

  it('returns an empty array for an unknown environment', () => {
    expect(getEnvironmentReplicaUtilizations(apiResponse, 'missing')).toEqual([])
  })

  it('matches the environment name exactly, not as a prefix (e.g. "prod" excludes "production")', () => {
    const data: ReplicaResourcesUtilizationResponse = {
      environments: {
        prod: { components: { web: { replicas: { 'web-0': mockReplica() } } } },
        production: { components: { web: { replicas: { 'web-0': mockReplica() } } } },
      },
    }
    expect(getEnvironmentReplicaUtilizations(data, 'prod')).toHaveLength(1)
  })
})

describe('getHighestSeverity', () => {
  const mockSeverity = (severity: SeverityWithReason['severity']): SeverityWithReason => ({
    severity,
    value: 0,
    reason: '',
  })

  it('returns the more severe of the two', () => {
    expect(getHighestSeverity(mockSeverity('Warning'), mockSeverity('Critical')).severity).toBe('Critical')
    expect(getHighestSeverity(mockSeverity('Critical'), mockSeverity('None')).severity).toBe('Critical')
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
    expect(getHighestCPUAlert([mockReplica({ cpuAverage: 1.5, cpuRequests: 1 })]).severity).toBe('Critical')
  })

  it('flags a replica above the high threshold as Warning', () => {
    expect(getHighestCPUAlert([mockReplica({ cpuAverage: 0.85, cpuRequests: 1 })]).severity).toBe('Warning')
  })

  it('flags a replica below the low threshold as Information', () => {
    expect(getHighestCPUAlert([mockReplica({ cpuAverage: 0.1, cpuRequests: 1 })]).severity).toBe('Information')
  })

  it('returns the most severe alert across replicas', () => {
    const alert = getHighestCPUAlert([
      mockReplica({ cpuAverage: 0.5, cpuRequests: 1 }),
      mockReplica({ cpuAverage: 1.5, cpuRequests: 1 }),
    ])
    expect(alert.severity).toBe('Critical')
  })

  it('includes the percent of requested in the reason', () => {
    expect(getHighestCPUAlert([mockReplica({ cpuAverage: 0.85, cpuRequests: 1 })]).reason).toContain('85% of requested')
  })
})

describe('getHighestMemoryAlert', () => {
  it('flags a replica above the memory max threshold as Critical', () => {
    expect(getHighestMemoryAlert([mockReplica({ memoryMaximum: 0.95, memoryRequests: 1 })]).severity).toBe('Critical')
  })

  it('flags a replica above the memory high threshold as Warning', () => {
    expect(getHighestMemoryAlert([mockReplica({ memoryMaximum: 0.75, memoryRequests: 1 })]).severity).toBe('Warning')
  })
})
