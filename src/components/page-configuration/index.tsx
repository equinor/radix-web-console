import { Typography } from '@equinor/eds-core-react';
import { BuildSecretsAccordion } from './build-secrets-accordion';
import ChangeAdminForm from './change-admin-form';
import { ChangeConfigurationItemForm } from './change-ci-form';
import { ChangeConfigBranchForm } from './change-config-branch-form';
import { ChangeConfigFileForm } from './change-config-file-form';
import { ChangeRepositoryForm } from './change-repository-form';
import DeleteApplicationForm from './delete-application-form';
import { ImageHubsAccordion } from './image-hubs-accordion';
import { Overview } from './overview';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ConfigureApplicationGithub } from '../configure-application-github';
import { DocumentTitle } from '../document-title';
import { routes } from '../../routes';
import { configVariables } from '../../utils/config';
import { routeWithParams } from '../../utils/string';

import './style.css';
import { radixApi, ApplicationRegistration } from '../../store/radix-api';
import { useParams } from 'react-router-dom';

function getConfigBranch(configBranch: string): string {
  return configBranch || 'master';
}

function getRadixConfigFullName(radixConfigFullName: string): string {
  return radixConfigFullName || 'radixconfig.yaml';
}

function getConfigBranchUrl({
  configBranch,
  repository,
}: ApplicationRegistration): string {
  return `${repository}/tree/${getConfigBranch(configBranch)}`;
}

function getConfigFileUrl({
  configBranch,
  radixConfigFullName,
  repository,
}: ApplicationRegistration): string {
  return `${repository}/blob/${configBranch}/${getRadixConfigFullName(
    radixConfigFullName
  )}`;
}

export default function PageConfiguration() {
  const { appName } = useParams();
  const {
    data: application,
    refetch,
    ...reqState
  } = radixApi.useGetApplicationQuery({ appName }, { pollingInterval: 15000 });
  const registration = application?.registration;

  return (
    <main>
      <DocumentTitle title={`${appName} Configuration`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Configuration' },
        ]}
      />

      <AsyncResource asyncState={reqState}>
        {registration?.name && (
          <>
            <Overview adGroups={registration.adGroups} appName={appName} />
            <section className="grid grid--gap-medium">
              <Typography variant="h4">GitHub</Typography>
              <Typography>
                Cloned from{' '}
                <Typography link href={registration.repository}>
                  {registration.repository}
                </Typography>
              </Typography>
              <Typography>
                Config branch{' '}
                <Typography link href={getConfigBranchUrl(registration)}>
                  {getConfigBranch(registration.configBranch)}
                </Typography>
              </Typography>
              <Typography>
                Config file{' '}
                <Typography link href={getConfigFileUrl(registration)}>
                  {getRadixConfigFullName(registration.radixConfigFullName)}
                </Typography>
              </Typography>
              <ConfigureApplicationGithub
                app={registration}
                deployKeyTitle="Deploy key"
                webhookTitle="Webhook"
                onDeployKeyChange={refetch}
                initialSecretPollInterval={5000}
              />
            </section>

            <section className="grid grid--gap-small">
              <Typography variant="h4">App Secrets</Typography>
              <ImageHubsAccordion appName={appName} />
              <BuildSecretsAccordion appName={appName} />
            </section>

            <section className="grid grid--gap-small">
              <Typography variant="h4">Danger Zone</Typography>
              {configVariables.FLAGS.enableChangeAdmin && (
                <ChangeAdminForm
                  registration={registration}
                  refetch={refetch}
                />
              )}
              <ChangeRepositoryForm
                appName={appName}
                repository={registration.repository}
                app={registration}
              />
              <ChangeConfigBranchForm
                appName={appName}
                configBranch={registration.configBranch}
              />
              <ChangeConfigFileForm
                appName={appName}
                radixConfigFullName={registration.radixConfigFullName}
              />
              <ChangeConfigurationItemForm
                appName={appName}
                configurationItem={registration.configurationItem}
              />
              <DeleteApplicationForm appName={appName} />
            </section>
          </>
        )}
      </AsyncResource>
    </main>
  );
}
