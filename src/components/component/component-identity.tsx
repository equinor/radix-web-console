import { List, Popover, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { AzureIdentity } from '../identity/azure-identity';
import {
  AzureIdentityModel,
  AzureIdentityModelValidationMap,
} from '../../models/radix-api/deployments/azure-identity';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/radix-api/deployments/deployment';
import {
  IdentityModel,
  IdentityModelValidationMap,
} from '../../models/radix-api/deployments/identity';
import { configVariables } from '../../utils/config';

interface AzureIdentityLinkProps {
  namespace: string;
  azure: AzureIdentityModel;
}

export interface ComponentIdentityProps {
  identity: IdentityModel;
  deployment: DeploymentModel;
}

const AzureIdentityLink = ({
  namespace,
  azure: { clientId, serviceAccountName, azureKeyVaults },
}: AzureIdentityLinkProps): JSX.Element => {
  const containerRef = useRef<HTMLElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

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
                  {azureKeyVaults.map((keyVault) => (
                    <List.Item key={keyVault}>{keyVault}</List.Item>
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

export const ComponentIdentity = ({
  identity: { azure },
  deployment,
}: ComponentIdentityProps): JSX.Element => (
  <Typography as="span">
    Identity enabled for{' '}
    {azure && (
      <AzureIdentityLink namespace={deployment.namespace} azure={azure} />
    )}
  </Typography>
);

AzureIdentityLink.propTypes = {
  namespace: PropTypes.string.isRequired,
  azure: PropTypes.shape(AzureIdentityModelValidationMap).isRequired,
} as PropTypes.ValidationMap<ComponentIdentityProps>;

ComponentIdentity.propTypes = {
  identity: PropTypes.shape(IdentityModelValidationMap).isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap).isRequired,
} as PropTypes.ValidationMap<ComponentIdentityProps>;
