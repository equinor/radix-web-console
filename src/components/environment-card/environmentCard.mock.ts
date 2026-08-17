import type { ComponentProps } from 'react'
import type { EnvironmentCard } from './EnvironmentCard'
import type {
  EnvironmentCardBuildSourceApplyConfig,
  EnvironmentCardBuildSourceBuildAndDeploy,
  EnvironmentCardBuildSourceDeploy,
  EnvironmentCardBuildSourceNotDeployed,
  EnvironmentCardBuildSourcePromoted,
  EnvironmentCardBuildSourceUnknown,
} from './environmentCard.types'

type EnvironmentCardProps = ComponentProps<typeof EnvironmentCard>

const APP_NAME = 'radix-api'
const REPOSITORY = 'https://github.com/equinor/some-fake-repo'

export const mockEnvironment: EnvironmentCardProps['environment'] = {
  name: 'dev',
  url: `/applications/${APP_NAME}/environments/dev`,
  isOrphan: false,
}

export const mockPublicComponents: EnvironmentCardProps['publicComponents'] = [
  { name: 'web', url: 'https://web-some-fake-app.equinor.com' },
  { name: 'api', url: 'https://api-some-fake-app.equinor.com' },
]

export const mockActiveDeployment: NonNullable<EnvironmentCardProps['activeDeployment']> = {
  name: `${APP_NAME}-dev-abcde-fghij`,
  activeFrom: '2026-08-01T10:00:00Z',
  url: `/applications/${APP_NAME}/deployments/${APP_NAME}-dev-abcde-fghij`,
}

export const mockBuildSource: EnvironmentCardBuildSourceBuildAndDeploy = {
  pipelineJobType: 'build-deploy',
  branchMapping: 'main',
  gitRef: 'main',
  shortCommitId: '0123456',
  commitUrl: `${REPOSITORY}/commit/0123456789abcdef`,
}

export const mockPromotedBuildSource: EnvironmentCardBuildSourcePromoted = {
  pipelineJobType: 'promote',
  promotedFrom: 'qa',
  pipelineJobUrl: `/applications/${APP_NAME}/jobs/radix-pipeline-20260801100000-abcde`,
}

export const mockApplyConfigBuildSource: EnvironmentCardBuildSourceApplyConfig = {
  pipelineJobType: 'apply-config',
  branchMapping: 'main',
  pipelineJobUrl: `/applications/${APP_NAME}/jobs/radix-pipeline-20260801100000-fghij`,
}

export const mockDeployExternalBuildSource: EnvironmentCardBuildSourceDeploy = {
  pipelineJobType: 'deploy',
  pipelineJobUrl: `/applications/${APP_NAME}/jobs/radix-pipeline-20260801100000-klmno`,
}

export const mockUnknownBuildSource: EnvironmentCardBuildSourceUnknown = {
  pipelineJobType: 'unknown',
}

export const mockAutomaticNotBuiltYetBuildSource: EnvironmentCardBuildSourceNotDeployed = {
  pipelineJobType: undefined,
  branchMapping: 'main',
}

export const mockPromotedNotBuiltYetBuildSource: EnvironmentCardBuildSourceNotDeployed = {
  pipelineJobType: undefined,
}
