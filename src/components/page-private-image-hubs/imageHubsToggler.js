import React from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import Panel from '../panel';
import Toggler from '../toggler';
import SecretStatus from '../secret-status';

import requestStates from '../../state/state-utils/request-states';
import useGetImageHubs from './useGetImageHubs';

import * as routing from '../../utils/routing';

const imageHubsToggler = props => {
  const { data, status, error } = useGetImageHubs(props.appName);

  return (
    <Panel>
      <Toggler summary="Private image hubs">
        <AsyncResource
          isLoading={status === requestStates.IN_PROGRESS}
          error={error}
        >
          {!data || data.length === 0 ? (
            <p>This app has no private image hubs</p>
          ) : (
            <ul className="o-indent-list">
              {data
                .sort((a, b) => (a.server < b.server ? -1 : 1))
                .map(imageHub => (
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

export default imageHubsToggler;
