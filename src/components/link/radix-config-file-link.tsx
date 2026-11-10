import { getConfigFileName } from '../../domain/radix-config/radixConfig.utils'
import type { ApplicationRegistration } from '../../store/radix-api'
import { linkToGitHubFile } from '../../utils/string'
import { ExternalLink } from './external-link'

interface RadixConfigFileLinkProps {
  registration: Pick<ApplicationRegistration, 'repository' | 'configBranch' | 'radixConfigFullName'>
}

export const RadixConfigFileLink = ({ registration }: RadixConfigFileLinkProps) => {
  const fileName = getConfigFileName(registration.radixConfigFullName)
  const href = linkToGitHubFile(registration.repository, registration.configBranch, fileName)

  return <ExternalLink href={href}>{fileName}</ExternalLink>
}
