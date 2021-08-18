import React from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import SecretForm from '../secret-form';
import AsyncResource from '../async-resource/simple-async-resource';

import useSaveEffect from './use-save-build-secret';
import useGetBuildSecrets from './use-get-build-secrets';
import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';

import routes from '../../routes';

const BuildSecrets = (props) => {
  const { appName, secretName } = props;
  const [getState, pollSecret] = useGetBuildSecrets(appName);
  const [saveState, saveSecretFunc, resetSaveState] = useSaveEffect(
    appName,
    secretName
  );

  const buildSecret =
    getState.data &&
    getState.data.find((buildSecret) => buildSecret.name === props.secretName);

  return (
    <React.Fragment>
      <DocumentTitle title={`Secret name ${secretName}`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Configuration',
            to: routeWithParams(routes.appConfig, {
              appName,
            }),
          },
          { label: 'Build secrets' },
          { label: secretName },
        ]}
      />
      <AsyncResource asyncState={getState}>
        <SecretForm
          saveState={saveState.status}
          saveError={saveState.error}
          secret={buildSecret}
          resetSaveState={resetSaveState}
          getSecret={pollSecret}
          secretName={secretName}
          handleSubmit={saveSecretFunc}
        />
      </AsyncResource>
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(['appName', 'secretName'], BuildSecrets);
