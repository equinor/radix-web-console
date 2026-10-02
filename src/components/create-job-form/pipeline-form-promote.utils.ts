import type { DeploymentSummary } from '../../store/radix-api'
import { formatDateTime } from '../../utils/datetime'
import { smallDeploymentName, smallGithubCommitHash } from '../../utils/string'

export const groupDeploymentsByEnvironment = (
  deployments: ReadonlyArray<DeploymentSummary>
): Record<string, Array<DeploymentSummary>> =>
  deployments.reduce<Record<string, Array<DeploymentSummary>>>((grouped, deployment) => {
    grouped[deployment.environment] = [...(grouped[deployment.environment] ?? []), deployment]
    return grouped
  }, {})

export const getDeploymentOptionLabel = (deployment: DeploymentSummary): string => {
  const formattedActiveFrom = deployment.activeFrom ? formatDateTime(deployment.activeFrom) : 'N/A'
  const activity = deployment.activeTo ? `(${formattedActiveFrom})` : '(currently active)'
  const commit = deployment.gitCommitHash ? ` ${smallGithubCommitHash(deployment.gitCommitHash)}` : ''
  const tags = deployment.gitTags ? `, ${deployment.gitTags}` : ''

  return `${smallDeploymentName(deployment.name)} ${activity}${commit}${tags}`
}
