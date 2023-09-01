import { FunctionComponent } from 'react';

import { useGetBuildSecrets } from './use-get-build-secrets';
import { useSaveBuildSecrets } from './use-save-build-secret';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { SecretForm } from '../secret-form';
import { routes } from '../../routes';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { routeWithParams } from '../../utils/string';

const BuildSecrets: FunctionComponent<{
  appName: string;
  secretName: string;
}> = ({ appName, secretName }) => {
  const [buildSecretsState, pollSecret] = useGetBuildSecrets(appName);
  const [saveState, saveSecretFunc, resetSaveState] = useSaveBuildSecrets(
    appName,
    secretName
  );

  return (
    <main className="grid grid--gap-medium">
      <DocumentTitle title={`Secret name ${secretName}`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Configuration',
            to: routeWithParams(routes.appConfig, { appName }),
          },
          { label: 'Build secrets' },
          { label: secretName },
        ]}
      />

      <AsyncResource asyncState={buildSecretsState}>
        <SecretForm
          saveState={saveState.status}
          saveError={saveState.error}
          secret={buildSecretsState.data?.find((x) => x.name === secretName)}
          resetSaveState={resetSaveState}
          getSecret={pollSecret}
          secretName={secretName}
          handleSubmit={saveSecretFunc}
        />
      </AsyncResource>
    </main>
  );
};

const Component = connectRouteParams(BuildSecrets);
export { Component, routeParamLoader as loader };
