import { List, Popover, Typography } from '@equinor/eds-core-react';
import {
  type FunctionComponent,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import type {
  AzureIdentity as AzureIdentityModel,
  Component,
  Deployment,
} from '../../store/radix-api';
import { configVariables } from '../../utils/config';
import { AzureIdentity } from '../identity/azure-identity';

const AzureIdentityLink: FunctionComponent<{
  namespace: string;
  azure: AzureIdentityModel;
}> = ({
  namespace,
  azure: { clientId, serviceAccountName, azureKeyVaults },
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleBodyClick = () => setPopoverOpen(false);
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  return (
    <>
      <Typography
        ref={containerRef}
        link
        token={{ textDecoration: 'none' }}
        onClick={(ev: SyntheticEvent) => {
          ev.stopPropagation();
          setPopoverOpen(!popoverOpen);
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
            {azureKeyVaults && azureKeyVaults.length > 0 && (
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
  );
};

export const ComponentIdentity: FunctionComponent<{
  component: Component;
  deployment: Deployment;
}> = ({ component, deployment }) => (
  <>
    {component.identity?.azure && (
      <Typography as="span">
        Identity enabled for{' '}
        {component.identity?.azure && (
          <AzureIdentityLink
            namespace={deployment.namespace}
            azure={component.identity.azure}
          />
        )}
      </Typography>
    )}
    {component.oauth2?.identity?.azure && (
      <Typography as="span">
        OAuth2 identity enabled for{' '}
        {component.oauth2.identity && (
          <AzureIdentityLink
            namespace={deployment.namespace}
            azure={component.oauth2.identity.azure}
          />
        )}
      </Typography>
    )}
  </>
);
