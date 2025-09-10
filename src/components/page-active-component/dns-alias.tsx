import type { FunctionComponent } from 'react'
import { ExternalLink } from '../link/external-link'

export interface EnvironmentComponentProps {
  url: string
}

export const DNSAlias: FunctionComponent<EnvironmentComponentProps> = ({ url }) => (
  <>
    <ExternalLink href={`https://${url}`}>{url}</ExternalLink>
  </>
)
