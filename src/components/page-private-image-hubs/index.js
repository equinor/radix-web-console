import React, { useState } from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import SecretForm from '../secret-form';
import AsyncResource from '../async-resource/simple-async-resource';

import Overview from './overview';

import useSaveEffect from './use-save-image-hub';
import useGetImageHubs from './use-get-image-hubs';
import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import requestStates from '../../state/state-utils/request-states';

import routes from '../../routes';
import './style.css';

const privateImageHubs = props => {
  const { appName, imageHubName } = props;
  const [secretValue, setSecretValue] = useState(null);

  const getState = useGetImageHubs(appName);
  const saveState = useSaveEffect(appName, imageHubName, secretValue);

  const imageHub =
    getState.data &&
    getState.data.find(hub => hub.server === props.imageHubName);

  return (
    <React.Fragment>
      <DocumentTitle title={`Image hub ${imageHubName}`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Configuration',
            to: routeWithParams(routes.appConfig, {
              appName,
            }),
          },
          { label: `Private image hubs` },
          { label: `${imageHubName}` },
        ]}
      />
      <AsyncResource
        isLoading={getState.status === requestStates.IN_PROGRESS}
        error={getState.error}
      >
        <SecretForm
          saveState={saveState.status}
          saveError={saveState.error}
          secret={imageHub}
          overview={
            imageHub && (
              <Overview server={imageHubName} username={imageHub.username} />
            )
          }
          handleSubmit={value => setSecretValue(value)}
        />
      </AsyncResource>
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'imageHubName'],
  privateImageHubs
);
