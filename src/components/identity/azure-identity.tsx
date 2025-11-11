import { Icon, Typography } from '@equinor/eds-core-react'
import { info_circle } from '@equinor/eds-icons'
import type { FunctionComponent } from 'react'

import { externalUrls } from '../../externalUrls'
import { Alert } from '../alert'
import { CompactCopyButton } from '../compact-copy-button'
import { ExternalLink } from '../link/external-link'

export interface AzureIdentityProps {
  oidcIssuerUrls: string[]
  namespace: string
  serviceAccountName: string
  clientId: string
  allowManagedIdentity?: boolean
}

const WorkloadIdentityHelp: FunctionComponent = () => (
  <Alert className="icon">
    <Icon data={info_circle} color="primary" />
    <div>
      <Typography as="span">
        Please refer to guide{' '}
        <ExternalLink href={externalUrls.workloadIdentityGuide}>Configure Workload Identity</ExternalLink> for
        information about configuration and troubleshooting
      </Typography>
    </div>
  </Alert>
)

const SelectAllContent: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  return <div style={{ userSelect: 'all' }}>{children}</div>
}

export const AzureIdentity: FunctionComponent<AzureIdentityProps> = ({
  oidcIssuerUrls,
  namespace,
  serviceAccountName,
  clientId,
  allowManagedIdentity,
}) => (
  <div className="grid grid--gap-medium">
    <div className="grid grid--gap-small">
      <div>
        <Typography group="input" variant="label">
          Client ID (
          {allowManagedIdentity && (
            <>
              <ExternalLink href="https://portal.azure.com/#browse/Microsoft.ManagedIdentity%2FuserAssignedIdentities">
                Managed Identity
              </ExternalLink>{' '}
              or{' '}
            </>
          )}
          <ExternalLink href="https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps">
            App Registration
          </ExternalLink>
          )
        </Typography>
        <SelectAllContent>
          <Typography as="span">{clientId}</Typography>
          <CompactCopyButton content={clientId} size={14} />
        </SelectAllContent>
      </div>
      <div>
        <Typography group="input" variant="label">
          Cluster Issuer URLs
        </Typography>
          <div className="grid grid--gap-small">
            {oidcIssuerUrls.map((url) => (
              <SelectAllContent key={url}>
                <div>
                  <Typography as="span">{url}</Typography>
                  <CompactCopyButton content={url} size={14} />
                </div>
              </SelectAllContent>
            ))}
          </div>
      </div>
      <div>
        <Typography group="input" variant="label">
          Namespace
        </Typography>
        <SelectAllContent>
          <Typography as="span">{namespace}</Typography>
          <CompactCopyButton content={namespace} size={14} />
        </SelectAllContent>
      </div>
      <div>
        <Typography group="input" variant="label">
          Service Account Name
        </Typography>
        <SelectAllContent>
          <Typography as="span">{serviceAccountName}</Typography>
          <CompactCopyButton content={serviceAccountName} size={14} />
        </SelectAllContent>
      </div>
    </div>
    <WorkloadIdentityHelp />
  </div>
)
