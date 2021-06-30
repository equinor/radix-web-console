import React from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import SecretStatus from '../secret-status';

import useGetImageHubs from '../page-private-image-hub/use-get-image-hubs';

import * as routing from '../../utils/routing';

import { Accordion } from '@equinor/eds-core-react';

const ImageHubsToggler = (props) => {
  const [getImageState] = useGetImageHubs(props.appName);
  const data = getImageState.data;

  return (
    <Accordion.Item className="accordion__item">
      <Accordion.Header className="accordion__header body_short">
        Private image hubs
      </Accordion.Header>
      <Accordion.Panel className="accordion__panel">
        <AsyncResource asyncState={getImageState}>
          {!data || data.length === 0 ? (
            <p>This app has no private image hubs</p>
          ) : (
            <ul className="o-indent-list">
              {data
                .sort((a, b) => (a.server < b.server ? -1 : 1))
                .map((imageHub) => (
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
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default ImageHubsToggler;
