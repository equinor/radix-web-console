import { describe, expect, it, vi } from 'vitest'
import type { DeploymentSummary } from '../../store/radix-api'
import { getDeploymentOptionLabel, groupDeploymentsByEnvironment } from './pipeline-form-promote.utils'

vi.mock('../../utils/datetime', () => ({
  formatDateTime: () => 'MOCKED_FORMATTED_DATE',
}))

const makeDeployment = (overrides: Partial<DeploymentSummary> = {}): DeploymentSummary => ({
  name: 'my-app-env-abcde',
  environment: 'dev',
  status: 'Ready', // Not really relevant for this test.
  ...overrides,
})

describe('groupDeploymentsByEnvironment', () => {
  it('returns an empty object for no deployments', () => {
    expect(groupDeploymentsByEnvironment([])).toEqual({})
  })

  it('groups deployments under their environment name', () => {
    const dev = makeDeployment({ name: 'dep-1', environment: 'dev' })
    const prod = makeDeployment({ name: 'dep-2', environment: 'prod' })

    expect(groupDeploymentsByEnvironment([dev, prod])).toEqual({
      dev: [dev],
      prod: [prod],
    })
  })

  it('collects multiple deployments for the same environment into one list', () => {
    const first = makeDeployment({ name: 'dep-1', environment: 'dev' })
    const second = makeDeployment({ name: 'dep-2', environment: 'dev' })

    expect(groupDeploymentsByEnvironment([first, second])).toEqual({
      dev: [first, second],
    })
  })

  it('preserves the input order within an environment group', () => {
    const first = makeDeployment({ name: 'dep-1', environment: 'dev' })
    const second = makeDeployment({ name: 'dep-2', environment: 'dev' })

    expect(groupDeploymentsByEnvironment([second, first]).dev).toEqual([second, first])
  })
})

describe('getDeploymentOptionLabel', () => {
  it('shortens the deployment name to the segment after the last dash', () => {
    const label = getDeploymentOptionLabel(makeDeployment({ name: 'my-app-env-abcde' }))

    expect(label).toBe('abcde (currently active)')
  })

  it('marks a deployment without an activeTo as currently active', () => {
    const label = getDeploymentOptionLabel(makeDeployment({ activeTo: undefined }))

    expect(label).toContain('(currently active)')
  })

  it('shows the formatted activeFrom date for an inactive deployment', () => {
    const label = getDeploymentOptionLabel(
      makeDeployment({ activeFrom: '2024-01-01T00:00:00Z', activeTo: '2024-02-01T00:00:00Z' })
    )

    expect(label).toContain('(MOCKED_FORMATTED_DATE)')
  })

  // TODO #1422 - deployment.activeFrom could be undefined, resulting in 'N/A'. Do we really want this behavior?
  it('shows N/A for an inactive deployment missing its activeFrom date', () => {
    const label = getDeploymentOptionLabel(makeDeployment({ activeFrom: undefined, activeTo: '2024-02-01T00:00:00Z' }))

    expect(label).toContain('(N/A)')
  })

  it('appends the shortened commit hash when present', () => {
    const label = getDeploymentOptionLabel(makeDeployment({ gitCommitHash: '0123456789abcdef' }))

    expect(label).toContain(' 0123456')
  })

  it('omits the commit hash when absent', () => {
    const label = getDeploymentOptionLabel(makeDeployment({ gitCommitHash: undefined }))

    expect(label).toBe('abcde (currently active)')
  })

  it('appends git tags when present', () => {
    const label = getDeploymentOptionLabel(makeDeployment({ gitTags: 'v1.0.0' }))

    expect(label).toContain(', v1.0.0')
  })
})
