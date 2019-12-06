import React, { useState } from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import SecretForm from '../secret-form';
import AsyncResource from '../async-resource/simple-async-resource';

import Overview from './overview';

import useSaveEffect from './use-save-build-secret';
import useGetBuildSecrets from './use-get-build-secrets';
import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';

import routes from '../../routes';

const BuildSecrets = props => {
  const { appName, secretName } = props;
  const [secretValue, setSecretValue] = useState(null);

  const [getState] = useGetBuildSecrets(appName);
  const [saveState] = useSaveEffect(appName, secretName, secretValue);

  const buildSecret =
    getState.data &&
    getState.data.find(buildSecret => buildSecret.name === props.secretName);

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
          { label: `Secret name` },
          { label: `${secretName}` },
        ]}
      />
      <AsyncResource asyncState={getState}>
        <SecretForm
          saveState={saveState.status}
          saveError={saveState.error}
          secret={buildSecret}
          overview={buildSecret && <Overview secretName={secretName} />}
          handleSubmit={value => setSecretValue(value)}
        />
      </AsyncResource>
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(['appName', 'secretName'], BuildSecrets);
