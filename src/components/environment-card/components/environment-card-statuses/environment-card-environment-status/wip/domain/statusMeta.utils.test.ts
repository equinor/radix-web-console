import { describe, expect, it } from 'vitest'
import type { Component, Environment } from '../../../../../../../store/radix-api'
import {
  AuxiliaryResourceDeploymentStatusMap,
  ComponentStatusMap,
  DeploymentStatusMap,
  JobStatusMap,
  ReplicaStatusMap,
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
// tie-breaking by weight, and how replicas/components are flattened out of an environment.

const componentWithReplicas = (statuses: Array<{ replicaStatus?: { status?: string } }>): Component =>
  ({ replicaList: statuses }) as unknown as Component

describe('getReplicasStatusMeta', () => {
  it('defaults to Running when there are no replicas', () => {
    expect(getReplicasStatusMeta([])).toEqual(ReplicaStatusMap.Running)
  })

  it('returns the heaviest-weighted replica status', () => {
    const components = [
      componentWithReplicas([
        { replicaStatus: { status: 'Running' } },
        { replicaStatus: { status: 'Failed' } },
        { replicaStatus: { status: 'Starting' } },
      ]),
    ]

    expect(getReplicasStatusMeta(components)).toEqual(ReplicaStatusMap.Failed)
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

    expect(getReplicasStatusMeta(components)).toEqual(ReplicaStatusMap.Failing)
  })

  it('treats a missing replica status as Running', () => {
    const components = [componentWithReplicas([{ replicaStatus: undefined }])]

    expect(getReplicasStatusMeta(components)).toEqual(ReplicaStatusMap.Running)
  })
})

describe('getComponentsStatusMeta', () => {
  it('defaults to Consistent when there are no components', () => {
    expect(getComponentsStatusMeta([])).toEqual(ComponentStatusMap.Consistent)
  })

  it('returns the heaviest-weighted component status', () => {
    const components = [{ status: 'Consistent' }, { status: 'Restarting' }, { status: 'Outdated' }] as Component[]

    expect(getComponentsStatusMeta(components)).toEqual(ComponentStatusMap.Restarting)
  })

  it('factors in the oauth2 auxiliary deployment status', () => {
    const components = [
      { status: 'Consistent', oauth2: { deployment: { status: 'Reconciling' } } },
    ] as unknown as Component[]

    expect(getComponentsStatusMeta(components)).toEqual(AuxiliaryResourceDeploymentStatusMap.Reconciling)
  })
})

describe('getDeploymentStatusMeta', () => {
  it('maps a deployment status to its meta', () => {
    expect(getDeploymentStatusMeta({ status: 'Failed' })).toEqual(DeploymentStatusMap.Failed)
  })

  it('defaults to Inactive when the status is missing', () => {
    expect(
      getDeploymentStatusMeta({ status: undefined } as unknown as Parameters<typeof getDeploymentStatusMeta>[0])
    ).toEqual(DeploymentStatusMap.Inactive)
  })
})

describe('getLatestJobStatusMeta', () => {
  it('maps a job status to its meta', () => {
    expect(getLatestJobStatusMeta({ status: 'Failed' })).toEqual(JobStatusMap.Failed)
  })

  it('defaults to Succeeded when there is no job', () => {
    expect(getLatestJobStatusMeta(undefined)).toEqual(JobStatusMap.Succeeded)
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
