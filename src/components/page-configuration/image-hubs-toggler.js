import React from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import Panel from '../panel';
import Toggler from '../toggler';
import SecretStatus from '../secret-status';

import useGetImageHubs from '../page-private-image-hub/use-get-image-hubs';

import * as routing from '../../utils/routing';

const ImageHubsToggler = props => {
  const getImageState = useGetImageHubs(props.appName);
  const data = getImageState.data;

  return (
    <Panel>
      <Toggler summary="Private image hubs">
        <AsyncResource asyncState={getImageState}>
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

export default ImageHubsToggler;
