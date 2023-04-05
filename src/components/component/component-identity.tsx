import { Accordion, Popover, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import {
  AzureIdentityModel,
  AzureIdentityModelValidationMap,
} from '../../models/azure-identity';

import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/deployment';
import { configVariables } from '../../utils/config';
import { AzureIdentity } from '../identity/azure-identity';
interface AzureIdentityLinkProps {
  namespace: string;
  azure: AzureIdentityModel;
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
              azureKeyVaults={azureKeyVaults}
            />
          </div>
          {azureKeyVaults?.length > 0 && (
            <div className="grid grid--gap-medium">
              <Accordion className="accordion elevated" chevronPosition="right">
                <Accordion.Item isExpanded={false}>
                  <Accordion.Header>
                    <Accordion.HeaderTitle>
                      <Typography
                        className="whitespace-nowrap"
                        variant="h6"
                        as="span"
                      >
                        Azure Key Vaults using Azure identity
                      </Typography>
                    </Accordion.HeaderTitle>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <div>
                      {azureKeyVaults.map((name: string) => (
                        <Typography key={name}>{name}</Typography>
                      ))}
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          )}
        </Popover.Content>
      </Popover>
    </>
  );
};

AzureIdentityLink.propTypes = {
  namespace: PropTypes.string.isRequired,
  azure: PropTypes.shape(AzureIdentityModelValidationMap).isRequired,
} as PropTypes.ValidationMap<ComponentIdentityProps>;

export interface ComponentIdentityProps {
  component: ComponentModel;
  deployment: DeploymentModel;
}

export const ComponentIdentity = ({
  component,
  deployment,
}: ComponentIdentityProps): JSX.Element => (
  <>
    {component.identity && (
      <>
        <Typography as="span">
          Identity enabled for{' '}
          {component.identity.azure && (
            <AzureIdentityLink
              namespace={deployment.namespace}
              azure={component.identity.azure}
            />
          )}
        </Typography>
      </>
    )}
  </>
);

ComponentIdentity.propTypes = {
  component: PropTypes.shape(ComponentModelValidationMap).isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap).isRequired,
} as PropTypes.ValidationMap<ComponentIdentityProps>;
