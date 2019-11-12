import React from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import Panel from '../panel';
import Toggler from '../toggler';
import SecretStatus from '../secret-status';

import { fetchPrivateImageHubsUrl } from '../../api/private-image-hubs';
import requestStates from '../../state/state-utils/request-states';
import useFetchJson from '../../effects/useFetchJson';

import * as routing from '../../utils/routing';

const privateImageHubForm = props => {
  const { url, resource } = fetchPrivateImageHubsUrl(props.appName);
  const { data, status, error } = useFetchJson(url, resource);

  return (
    <Panel>
      <Toggler summary="Private image hubs" startVisible={true}>
        <AsyncResource
          isLoading={status === requestStates.IN_PROGRESS}
          error={error}
        >
          {!data || data.length === 0 ? (
            <p>This component uses no private image hubs</p>
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

export default privateImageHubForm;
