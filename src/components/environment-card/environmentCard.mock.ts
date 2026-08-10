import type { ComponentProps } from 'react'
import type { EnvironmentCard } from './EnvironmentCard'

type EnvironmentCardProps = ComponentProps<typeof EnvironmentCard>

const APP_NAME = 'radix-api'
const REPOSITORY = 'https://github.com/equinor/radix-api'

export const mockEnvironment: EnvironmentCardProps['environment'] = {
  name: 'dev',
  url: `/applications/${APP_NAME}/environments/dev`,
  isOrphan: false,
}

export const mockPublicComponents: EnvironmentCardProps['publicComponents'] = [
  { name: 'web', url: 'https://web-radix-api-dev.radix.equinor.com' },
  { name: 'api', url: 'https://api-radix-api-dev.radix.equinor.com' },
]

export const mockActiveDeployment: NonNullable<EnvironmentCardProps['activeDeployment']> = {
  name: `${APP_NAME}-dev-abcde-fghij`,
  activeFrom: '2026-08-01T10:00:00Z',
  url: `/applications/${APP_NAME}/deployments/${APP_NAME}-dev-abcde-fghij`,
}

export const mockBuildSource: EnvironmentCardProps['buildSource'] = {
  kind: 'automatic',
  branchMapping: 'main',
  gitRef: 'main',
  shortCommitId: '0123456',
  commitUrl: `${REPOSITORY}/commit/0123456789abcdef`,
}

export const mockPromotedBuildSource: EnvironmentCardProps['buildSource'] = {
  kind: 'promoted',
  promotedFrom: 'qa',
  pipelineJobUrl: `/applications/${APP_NAME}/jobs/radix-pipeline-20260801100000-abcde`,
}

export const mockAutomaticNotBuiltYetBuildSource: EnvironmentCardProps['buildSource'] = {
  kind: 'automatic-not-built-yet',
  branchMapping: 'main',
}

export const mockPromotedNotBuiltYetBuildSource: EnvironmentCardProps['buildSource'] = {
  kind: 'promoted-not-built-yet',
}
