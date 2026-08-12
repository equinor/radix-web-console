import { describe, expect, it } from 'vitest'
import { routes } from '../../router/routes'
import type { Application, Component, DeploymentSummary, EnvironmentSummary } from '../../store/radix-api'
import { getAppDeploymentUrl } from '../../utils/routing'
import { routeWithParams } from '../../utils/string'
import {
  getBuildSource,
  getEnvironmentCardProps,
  getPublicComponents,
  URL_VAR_NAME,
} from './environmentCardContainer.utils'

describe('getBuildSource', () => {
  it('marks a promoted deployment that has a branch mapping as promoted, keeping the branch mapping', () => {
    const source = getBuildSource({
      pipelineJobType: 'promote',
      branchMapping: 'main',
      promotedFrom: 'qa',
      pipelineJobUrl: '/job/123',
    })

    expect(source).toEqual({
      kind: 'promoted',
      branchMapping: 'main',
      promotedFrom: 'qa',
      pipelineJobUrl: '/job/123',
    })
  })

  it('marks a promoted deployment without a branch mapping as promoted', () => {
    const source = getBuildSource({
      pipelineJobType: 'promote',
      promotedFrom: 'qa',
      pipelineJobUrl: '/job/123',
    })

    expect(source).toEqual({
      kind: 'promoted',
      promotedFrom: 'qa',
      pipelineJobUrl: '/job/123',
    })
  })

  it('marks a deployment built from a branch mapping as automatic', () => {
    const source = getBuildSource({
      pipelineJobType: 'build-deploy',
      gitRef: 'main',
      shortCommitId: 'abc123',
      branchMapping: 'main',
      commitUrl: 'https://repo/commit/abc123',
      promotedFrom: undefined,
    })

    expect(source).toEqual({
      kind: 'build-deployed',
      branchMapping: 'main',
      gitRef: 'main',
      shortCommitId: 'abc123',
      commitUrl: 'https://repo/commit/abc123',
    })
  })

  it('marks a branch mapping with no pipelineJobType as automatic-not-deployed-yet', () => {
    const source = getBuildSource({ branchMapping: 'release-.*', promotedFrom: undefined })

    expect(source).toEqual({
      kind: 'automatic-not-deployed-yet',
      branchMapping: 'release-.*',
    })
  })

  it('marks a deployment with no pipelineJobType as manual-not-deployed-yet', () => {
    const source = getBuildSource({ promotedFrom: undefined })

    expect(source).toEqual({ kind: 'manual-not-deployed-yet' })
  })
})

describe('getPublicComponents', () => {
  const makeComponent = (name: string, publicDomain?: string): Component =>
    ({ name, variables: publicDomain ? { [URL_VAR_NAME]: publicDomain } : {} }) as unknown as Component

  it('returns an empty list when there are no components', () => {
    expect(getPublicComponents()).toEqual([])
  })

  it('keeps only components exposing a public domain and builds an https url', () => {
    const components = [
      makeComponent('web', 'web.example.com'),
      makeComponent('worker'),
      makeComponent('api', 'api.example.com'),
    ]

    expect(getPublicComponents(components)).toEqual([
      { name: 'web', url: 'https://web.example.com' },
      { name: 'api', url: 'https://api.example.com' },
    ])
  })
})

describe('getEnvironmentCardProps', () => {
  const application: Pick<Application, 'name' | 'registration'> = {
    name: 'radix-api',
    registration: { repository: 'https://github.com/equinor/radix-api' } as Application['registration'],
  }

  const makeEnvironment = (
    activeDeployment: DeploymentSummary | undefined,
    overrides: Partial<Pick<EnvironmentSummary, 'name' | 'status' | 'branchMapping'>> = {}
  ): Pick<EnvironmentSummary, 'name' | 'status' | 'activeDeployment' | 'branchMapping'> => ({
    name: 'dev',
    status: 'Consistent',
    branchMapping: 'main',
    activeDeployment,
    ...overrides,
  })

  it('maps an automatically built environment to card props', () => {
    const environment = makeEnvironment({
      name: 'radix-api-dev-abcde-fghij',
      activeFrom: '2026-08-01T10:00:00Z',
      pipelineJobType: 'build-deploy',
      gitCommitHash: '0123456789abcdef',
      gitRef: 'main',
    } as DeploymentSummary)

    const props = getEnvironmentCardProps(application, environment, [])

    expect(props.environment).toEqual({
      name: 'dev',
      url: routeWithParams(routes.appEnvironment, { appName: 'radix-api', envName: 'dev' }),
      isOrphan: false,
    })
    expect(props.activeDeployment).toEqual({
      name: 'radix-api-dev-abcde-fghij',
      url: getAppDeploymentUrl('radix-api', 'radix-api-dev-abcde-fghij'),
      activeFrom: '2026-08-01T10:00:00Z',
    })
    expect(props.buildSource).toEqual({
      kind: 'build-deployed',
      branchMapping: 'main',
      gitRef: 'main',
      shortCommitId: '0123456',
      commitUrl: 'https://github.com/equinor/radix-api/commit/0123456789abcdef',
    })
  })

  it('derives isOrphan from an Orphan environment status', () => {
    const environment = makeEnvironment(undefined, { status: 'Orphan' })

    expect(getEnvironmentCardProps(application, environment).environment.isOrphan).toBe(true)
  })

  it('has no active deployment when the environment has none', () => {
    const environment = makeEnvironment(undefined)

    expect(getEnvironmentCardProps(application, environment).activeDeployment).toBeUndefined()
  })

  it('builds an automatic-not-built-yet source from a branch mapping without a deployment', () => {
    const environment = makeEnvironment(undefined, { branchMapping: 'main' })

    expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({
      kind: 'automatic-not-deployed-yet',
      branchMapping: 'main',
    })
  })

  it('wires a promoted deployment through to the build source with a pipeline job link', () => {
    const environment = makeEnvironment(
      {
        name: 'radix-api-prod-xyz',
        activeFrom: '2026-08-02T10:00:00Z',
        pipelineJobType: 'promote',
        promotedFromEnvironment: 'qa',
        createdByJob: 'radix-pipeline-20260802-xyz',
      } as DeploymentSummary,
      { name: 'prod', branchMapping: undefined }
    )

    const props = getEnvironmentCardProps(application, environment)

    expect(props.buildSource).toEqual({
      kind: 'promoted',
      promotedFrom: 'qa',
      pipelineJobUrl: routeWithParams(routes.appJob, {
        appName: 'radix-api',
        jobName: 'radix-pipeline-20260802-xyz',
      }),
    })
  })

  it('derives public components from the passed component list', () => {
    const environment = makeEnvironment(undefined)

    const props = getEnvironmentCardProps(application, environment, [
      { name: 'web', variables: { [URL_VAR_NAME]: 'web.example.com' } } as unknown as Component,
    ])

    expect(props.publicComponents).toEqual([{ name: 'web', url: 'https://web.example.com' }])
  })
})
