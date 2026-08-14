import { describe, expect, it } from 'vitest'
import { routes } from '../../router/routes'
import type { Application, Component, DeploymentSummary, EnvironmentSummary } from '../../store/radix-api'
import { getAppDeploymentUrl } from '../../utils/routing'
import { routeWithParams } from '../../utils/string'
import { getEnvironmentCardProps, getPublicComponents, URL_VAR_NAME } from './environmentCardContainer.utils'

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

  const jobUrl = (jobName: string) => routeWithParams(routes.appJob, { appName: 'radix-api', jobName })

  it('maps environment metadata and the active deployment', () => {
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
  })

  it('derives isOrphan from an Orphan environment status', () => {
    const environment = makeEnvironment(undefined, { status: 'Orphan' })

    expect(getEnvironmentCardProps(application, environment).environment.isOrphan).toBe(true)
  })

  it('has no active deployment when the environment has none', () => {
    const environment = makeEnvironment(undefined)

    expect(getEnvironmentCardProps(application, environment).activeDeployment).toBeUndefined()
  })

  it('derives public components from the passed component list', () => {
    const environment = makeEnvironment(undefined)

    const props = getEnvironmentCardProps(application, environment, [
      { name: 'web', variables: { [URL_VAR_NAME]: 'web.example.com' } } as unknown as Component,
    ])

    expect(props.publicComponents).toEqual([{ name: 'web', url: 'https://web.example.com' }])
  })

  describe('build source', () => {
    it('maps a build-deploy with its branch, commit and commit url', () => {
      const environment = makeEnvironment({
        name: 'radix-api-dev',
        activeFrom: '2026-08-01T10:00:00Z',
        pipelineJobType: 'build-deploy',
        gitRef: 'main',
        gitCommitHash: '0123456789abcdef',
      } as DeploymentSummary)

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({
        pipelineJobType: 'build-deploy',
        branchMapping: 'main',
        gitRef: 'main',
        shortCommitId: '0123456',
        commitUrl: 'https://github.com/equinor/radix-api/commit/0123456789abcdef',
      })
    })

    it('maps a promotion, wiring the pipeline job link', () => {
      const environment = makeEnvironment(
        {
          name: 'radix-api-prod',
          activeFrom: '2026-08-02T10:00:00Z',
          pipelineJobType: 'promote',
          promotedFromEnvironment: 'qa',
          createdByJob: 'radix-pipeline-20260802-xyz',
        } as DeploymentSummary,
        { branchMapping: undefined }
      )

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({
        pipelineJobType: 'promote',
        promotedFrom: 'qa',
        pipelineJobUrl: jobUrl('radix-pipeline-20260802-xyz'),
      })
    })

    it('maps an apply-config re-deployment', () => {
      const environment = makeEnvironment({
        name: 'radix-api-dev',
        activeFrom: '2026-08-03T10:00:00Z',
        pipelineJobType: 'apply-config',
        createdByJob: 'radix-pipeline-20260803-abc',
      } as DeploymentSummary)

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({
        pipelineJobType: 'apply-config',
        branchMapping: 'main',
        pipelineJobUrl: jobUrl('radix-pipeline-20260803-abc'),
      })
    })

    it('maps an externally deployed image without a branch mapping', () => {
      const environment = makeEnvironment(
        {
          name: 'radix-api-dev',
          activeFrom: '2026-08-04T10:00:00Z',
          pipelineJobType: 'deploy',
          createdByJob: 'radix-pipeline-20260804-def',
        } as DeploymentSummary,
        { branchMapping: undefined }
      )

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({
        pipelineJobType: 'deploy',
        pipelineJobUrl: jobUrl('radix-pipeline-20260804-def'),
      })
    })

    it('reports not deployed yet from a branch mapping with no active deployment', () => {
      const environment = makeEnvironment(undefined, { branchMapping: 'main' })

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({
        pipelineJobType: undefined,
        branchMapping: 'main',
      })
    })

    it('reports not deployed yet with no branch mapping', () => {
      const environment = makeEnvironment(undefined, { branchMapping: undefined })

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({ pipelineJobType: undefined })
    })

    it('falls back to unknown for a deployed build-deploy missing its commit', () => {
      const environment = makeEnvironment({
        name: 'radix-api-dev',
        activeFrom: '2026-08-05T10:00:00Z',
        pipelineJobType: 'build-deploy',
        gitRef: 'main',
      } as DeploymentSummary)

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({ pipelineJobType: 'unknown' })
    })

    it('falls back to unknown for a plain build job', () => {
      const environment = makeEnvironment({
        name: 'radix-api-dev',
        activeFrom: '2026-08-06T10:00:00Z',
        pipelineJobType: 'build',
      } as DeploymentSummary)

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({ pipelineJobType: 'unknown' })
    })

    it('falls back to unknown for a promotion missing its source environment', () => {
      const environment = makeEnvironment(
        {
          name: 'radix-api-prod',
          activeFrom: '2026-08-07T10:00:00Z',
          pipelineJobType: 'promote',
          createdByJob: 'radix-pipeline-20260807-ghi',
        } as DeploymentSummary,
        { branchMapping: undefined }
      )

      expect(getEnvironmentCardProps(application, environment).buildSource).toEqual({ pipelineJobType: 'unknown' })
    })

    it('omits the commit url for a build-deploy when the app has no repository', () => {
      const applicationWithoutRepo: Pick<Application, 'name' | 'registration'> = {
        name: 'radix-api',
        registration: {} as Application['registration'],
      }
      const environment = makeEnvironment({
        name: 'radix-api-dev',
        activeFrom: '2026-08-08T10:00:00Z',
        pipelineJobType: 'build-deploy',
        gitRef: 'main',
        gitCommitHash: '0123456789abcdef',
      } as DeploymentSummary)

      expect(getEnvironmentCardProps(applicationWithoutRepo, environment).buildSource).toEqual({
        pipelineJobType: 'build-deploy',
        branchMapping: 'main',
        gitRef: 'main',
        shortCommitId: '0123456',
      })
    })
  })
})
