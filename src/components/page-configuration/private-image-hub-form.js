import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import Panel from '../panel';
import Toggler from '../toggler';
import SecretStatus from '../secret-status';

import { fetchPrivateImageHubs } from '../../api/private-image-hubs';
import requestStates from '../../state/state-utils/request-states';

import * as routing from '../../utils/routing';

const privateImageHubForm = props => {
  const [imageHubs, setImageHubs] = useState([]);
  const [getState, setGetState] = useState(requestStates.IDLE);
  const [getError, setGetError] = useState('');

  useEffect(() => {
    setGetState(requestStates.IN_PROGRESS);
    fetchPrivateImageHubs(props.appName)
      .then(hubs => {
        setGetState(requestStates.SUCCESS);
        setImageHubs(hubs);
      })
      .catch(err => {
        setGetState(requestStates.ERROR);
        setGetError(err.toString());
      });
  }, ['appName']);

  return (
    <Panel>
      <Toggler summary="Private image hubs" startVisible={true}>
        <AsyncResource
          isLoading={getState === requestStates.IN_PROGRESS}
          error={getError}
        >
          {imageHubs.length === 0 ? (
            <p>This component uses no private image hubs</p>
          ) : (
            <ul className="o-indent-list">
              {imageHubs.sort().map(imageHub => (
                <li key={imageHub.server}>
                  <Link
                    to={routing.getPrivateImageHubUrl(
                      props.appName,
                      imageHub.server
                    )}
                  >
                    {imageHub.server}
                  </Link>{' '}
                  <SecretStatus secret={imageHub} />
                </li>
              ))}
            </ul>
          )}
        </AsyncResource>
      </Toggler>
    </Panel>
  );
};

export default privateImageHubForm;
