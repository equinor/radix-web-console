import { List, Popover, Typography } from '@equinor/eds-core-react'
import * as PropTypes from 'prop-types'
import {
  type FunctionComponent,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

import { AzureIdentity } from '../identity/azure-identity'
import type {
  AzureIdentity as AzureIdentityModel,
  Deployment,
  Identity,
} from '../../store/radix-api'
import { configVariables } from '../../utils/config'

const AzureIdentityLink: FunctionComponent<{
  namespace: string
  azure: AzureIdentityModel
}> = ({
  namespace,
  azure: { clientId, serviceAccountName, azureKeyVaults },
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleBodyClick = () => setPopoverOpen(false)
    document.body.addEventListener('click', handleBodyClick)
    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  }, [])

  return (
    <>
      <Typography
        ref={containerRef}
        link
        token={{ textDecoration: 'none' }}
        onClick={(ev: SyntheticEvent) => {
          ev.stopPropagation()
          setPopoverOpen(!popoverOpen)
        }}
      >
        Azure
      </Typography>

      <Popover
        open={popoverOpen}
        anchorEl={containerRef.current}
        onClick={(ev) => ev.stopPropagation()}
      >
        <Popover.Header>
          Azure Federated Credentials Configuration
        </Popover.Header>
        <Popover.Content>
          <div className="grid grid--gap-medium">
            <AzureIdentity
              oidcIssuerUrl={configVariables.CLUSTER_OIDC_ISSUER_URL}
              clientId={clientId}
              namespace={namespace}
              serviceAccountName={serviceAccountName}
            />
            {azureKeyVaults?.length > 0 && (
              <div className="grid grid--gap-small">
                <Typography
                  className="whitespace-nowrap"
                  variant="h6"
                  as="span"
                >
                  Azure Key Vaults using Azure identity
                </Typography>
                <List variant="bullet">
                  {azureKeyVaults.map((x) => (
                    <List.Item key={x}>{x}</List.Item>
                  ))}
                </List>
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover>
    </>
  )
}

export const ComponentIdentity: FunctionComponent<{
  identity: Identity
  deployment: Deployment
}> = ({ identity: { azure }, deployment }) => (
  <Typography as="span">
    Identity enabled for{' '}
    {azure && (
      <AzureIdentityLink namespace={deployment.namespace} azure={azure} />
    )}
  </Typography>
)

AzureIdentityLink.propTypes = {
  namespace: PropTypes.string.isRequired,
  azure: PropTypes.object.isRequired as PropTypes.Validator<AzureIdentityModel>,
}

ComponentIdentity.propTypes = {
  identity: PropTypes.object.isRequired as PropTypes.Validator<Identity>,
  deployment: PropTypes.object.isRequired as PropTypes.Validator<Deployment>,
}
