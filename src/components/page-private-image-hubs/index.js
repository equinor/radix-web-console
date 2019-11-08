import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

import AsyncResource from '../async-resource';
import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import SecretForm from '../secret-form';

import * as actionCreators from '../../state/subscriptions/action-creators';
import { getSaveState, getSaveError } from '../../state/secrets';
import { getSecret } from '../../state/environment';
import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import secretActions from '../../state/secrets/action-creators';
import routes from '../../routes';

const privateImageHubs = props => {
  const { appName, imageHubName } = props;
  const saveState = 'REQUEST_STATUS_IDLE';
  const saveError = '';

  const [imageHubs, setImageHubs] = useState([]);
  const [selectedImageHub, setSelectedImageHub] = useState();

  useEffect(() => {
    console.log('load image hub');
  }, [appName, imageHubName]);

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

      <SecretForm
        saveState={saveState}
        saveError={saveError}
        secret={selectedImageHub}
        handleSubmit={value => this.props.saveSecret(value)}
      />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'imageHubName'],
  privateImageHubs
);
