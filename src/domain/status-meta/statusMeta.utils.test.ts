import { describe, expect, it } from 'vitest'
import type { Component, Environment } from '../../store/radix-api'
import {
  AUXILIARY_RESOURCE_DEPLOYMENT_STATUS_MAP,
  COMPONENT_STATUS_MAP,
  DEPLOYMENT_STATUS_MAP,
  JOB_STATUS_MAP,
  REPLICA_STATUS_MAP,
  UNKNOWN_STATUS_META,
} from './statusMeta.const'
import {
  getComponentsStatusMeta,
  getDeploymentStatusMeta,
  getEnvironmentsStatusMeta,
  getLatestJobStatusMeta,
  getReplicasStatusMeta,
} from './statusMeta.utils'

// We intentionally don't assert every entry of the status maps here; the maps are static data
// covered by their `satisfies` types. These tests focus on the aggregation logic: defaults,
// most-severe-by-alert-level selection, and how replicas/components are flattened out of an environment.

const componentWithReplicas = (statuses: Array<{ replicaStatus?: { status?: string } }>): Component =>
  ({ replicaList: statuses }) as unknown as Component

describe('getReplicasStatusMeta', () => {
  it('defaults to Running when there are no replicas', () => {
    expect(getReplicasStatusMeta([])).toEqual(REPLICA_STATUS_MAP.Running)
  })

  it('returns the most severe replica status', () => {
    const components = [
      componentWithReplicas([
        { replicaStatus: { status: 'Running' } },
        { replicaStatus: { status: 'Failed' } },
        { replicaStatus: { status: 'Starting' } },
      ]),
    ]

    expect(getReplicasStatusMeta(components)).toEqual(REPLICA_STATUS_MAP.Failed)
  })

  it('includes oauth2 deployment replicas in the aggregation', () => {
    const components = [
      {
        replicaList: [{ replicaStatus: { status: 'Running' } }],
        oauth2: {
          deployments: [{ replicaList: [{ replicaStatus: { status: 'Failing' } }] }],
        },
      },
    ] as unknown as Component[]

    expect(getReplicasStatusMeta(components)).toEqual(REPLICA_STATUS_MAP.Failing)
  })

  it('treats a missing replica status as unknown', () => {
    const components = [componentWithReplicas([{ replicaStatus: undefined }])]

    expect(getReplicasStatusMeta(components)).toEqual(UNKNOWN_STATUS_META)
  })

  it('falls back to unknown when a replica status is not a known value', () => {
    const components = [componentWithReplicas([{ replicaStatus: { status: 'Bogus' } }])]

    expect(getReplicasStatusMeta(components)).toEqual(UNKNOWN_STATUS_META)
  })
})

describe('getComponentsStatusMeta', () => {
  it('defaults to Consistent when there are no components', () => {
    expect(getComponentsStatusMeta([])).toEqual(COMPONENT_STATUS_MAP.Consistent)
  })

  it('returns the most severe component status', () => {
    const components = [{ status: 'Consistent' }, { status: 'Restarting' }, { status: 'Outdated' }] as Component[]

    expect(getComponentsStatusMeta(components)).toEqual(COMPONENT_STATUS_MAP.Outdated)
  })

  it('factors in the oauth2 auxiliary deployment status', () => {
    const components = [
      { status: 'Consistent', oauth2: { deployments: [{ status: 'Reconciling' }] } },
    ] as unknown as Component[]

    expect(getComponentsStatusMeta(components)).toEqual(AUXILIARY_RESOURCE_DEPLOYMENT_STATUS_MAP.Reconciling)
  })

  it('falls back to unknown when a component status is not a known value', () => {
    const components = [{ status: 'Bogus' }] as unknown as Component[]

    expect(getComponentsStatusMeta(components)).toEqual(UNKNOWN_STATUS_META)
  })
})

describe('getDeploymentStatusMeta', () => {
  it('maps a deployment status to its meta', () => {
    expect(getDeploymentStatusMeta({ status: 'Failed' })).toEqual(DEPLOYMENT_STATUS_MAP.Failed)
  })

  // Edge case: Backend doesn't provide a status for a deployment that hasn't been deployed yet.
  it('falls back to "Ready" when the status is missing/undefined', () => {
    expect(
      getDeploymentStatusMeta({ status: undefined } as unknown as Parameters<typeof getDeploymentStatusMeta>[0])
    ).toEqual(DEPLOYMENT_STATUS_MAP.Ready)
  })

  it('falls back to unknown when the status is not a known value', () => {
    expect(
      getDeploymentStatusMeta({ status: 'Bogus' } as unknown as Parameters<typeof getDeploymentStatusMeta>[0])
    ).toEqual(UNKNOWN_STATUS_META)
  })
})

describe('getLatestJobStatusMeta', () => {
  it('maps a job status to its meta', () => {
    expect(getLatestJobStatusMeta({ status: 'Failed' })).toEqual(JOB_STATUS_MAP.Failed)
  })

  it('falls back to unknown when there is no job', () => {
    expect(getLatestJobStatusMeta(undefined)).toEqual(UNKNOWN_STATUS_META)
  })

  it('falls back to unknown when the status is not a known value', () => {
    expect(
      getLatestJobStatusMeta({ status: 'Bogus' } as unknown as Parameters<typeof getLatestJobStatusMeta>[0])
    ).toEqual(UNKNOWN_STATUS_META)
  })
})

describe('getEnvironmentsStatusMeta', () => {
  it('defaults to a healthy status for an empty environment list', () => {
    expect(getEnvironmentsStatusMeta([]).alertLevel).toBe('None')
  })

  it('surfaces the worst alert level across deployments, components and replicas', () => {
    const environments = [
      {
        activeDeployment: {
          status: 'Ready',
          components: [{ status: 'Consistent', replicaList: [{ replicaStatus: { status: 'Failed' } }] }],
        },
      },
    ] as unknown as ReadonlyArray<Pick<Environment, 'activeDeployment'>>

    expect(getEnvironmentsStatusMeta(environments).alertLevel).toBe('Danger')
  })

  it('ignores environments without an active deployment', () => {
    const environments = [{ activeDeployment: undefined }] as ReadonlyArray<Pick<Environment, 'activeDeployment'>>

    expect(getEnvironmentsStatusMeta(environments).alertLevel).toBe('None')
  })
})
