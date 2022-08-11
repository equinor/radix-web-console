import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import { useGetImageHubs } from '../page-private-image-hub/use-get-image-hubs';
import { ImageHubSecretStatusBadge } from '../status-badges/image-hub-secret-status-badge';
import { getPrivateImageHubUrl } from '../../utils/routing';

export const ImageHubsToggler = (props) => {
  const [getImageState] = useGetImageHubs(props.appName);
  const data = getImageState.data;

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>Private image hubs</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={getImageState}>
            {data?.length > 0 ? (
              <List className="o-indent-list secrets">
                {data
                  .sort((a, b) => (a.server < b.server ? -1 : 1))
                  .map((imageHub) => (
                    <List.Item key={imageHub.server}>
                      <Link
                        to={getPrivateImageHubUrl(
                          props.appName,
                          imageHub.server
                        )}
                      >
                        <Typography link as="span">
                          {imageHub.server}
                        </Typography>
                      </Link>
                      <ImageHubSecretStatusBadge status={imageHub.status} />
                    </List.Item>
                  ))}
              </List>
            ) : (
              <Typography>This app has no private image hubs</Typography>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ImageHubsToggler.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default ImageHubsToggler;
