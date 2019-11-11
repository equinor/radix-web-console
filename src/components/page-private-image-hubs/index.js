import React, { useState, useEffect } from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import SecretForm from '../secret-form';
import AsyncResource from '../async-resource/simple-async-resource';

import Overview from './overview';

import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import requestStates from '../../state/state-utils/request-states';
import {
  fetchPrivateImageHubs,
  saveImageHubSecret,
} from '../../api/private-image-hubs';
import routes from '../../routes';

import './style.css';

const privateImageHubs = props => {
  const { appName, imageHubName } = props;
  const [imageHub, setImageHub] = useState({});
  const [getState, setGetState] = useState(requestStates.IDLE);
  const [getError, setGetError] = useState('');
  const [saveState, setSaveState] = useState(requestStates.IDLE);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setGetState(requestStates.IN_PROGRESS);
    fetchPrivateImageHubs(props.appName)
      .then(hubs => {
        setGetState(requestStates.SUCCESS);
        if (hubs && hubs.length > 0) {
          const imageHub = hubs.find(hub => hub.server === props.imageHubName);
          setImageHub(imageHub);
        }
      })
      .catch(err => {
        setGetState(requestStates.ERROR);
        setGetError(err.toString());
      });
  }, [appName, imageHubName]);

  const saveSecret = value => {
    setSaveState(requestStates.IN_PROGRESS);
    saveImageHubSecret(appName, imageHubName, value)
      .then(() => setSaveState(requestStates.SUCCESS))
      .catch(err => {
        setSaveState(requestStates.ERROR);
        setSaveError(err.toString());
      });
  };

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
        isLoading={getState === requestStates.IN_PROGRESS}
        error={getError}
      >
        <SecretForm
          saveState={saveState}
          saveError={saveError}
          secret={imageHub}
          overview={
            imageHub ? (
              <Overview server={imageHubName} username={imageHub.username} />
            ) : null
          }
          handleSubmit={value => saveSecret(value)}
        />
      </AsyncResource>
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'imageHubName'],
  privateImageHubs
);
