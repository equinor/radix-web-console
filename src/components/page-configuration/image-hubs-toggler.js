import React from 'react';
import { Link } from 'react-router-dom';
import AsyncResource from '../async-resource/simple-async-resource';
import SecretStatus from '../secret-status';
import useGetImageHubs from '../page-private-image-hub/use-get-image-hubs';
import * as routing from '../../utils/routing';
import { Accordion, List, Typography } from '@equinor/eds-core-react';

const ImageHubsToggler = (props) => {
  const [getImageState] = useGetImageHubs(props.appName);
  const data = getImageState.data;

  return (
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Private image hubs</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <AsyncResource asyncState={getImageState}>
          {!data || data.length === 0 ? (
            <Typography>This app has no private image hubs</Typography>
          ) : (
            <List className="o-indent-list secrets">
              {data
                .sort((a, b) => (a.server < b.server ? -1 : 1))
                .map((imageHub) => (
                  <List.Item key={imageHub.server}>
                    <Link
                      to={routing.getPrivateImageHubUrl(
                        props.appName,
                        imageHub.server
                      )}
                    >
                      <Typography link as="span">
                        {imageHub.server}
                      </Typography>
                    </Link>
                    <SecretStatus secret={imageHub} />
                  </List.Item>
                ))}
            </List>
          )}
        </AsyncResource>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default ImageHubsToggler;
