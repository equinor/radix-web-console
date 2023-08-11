import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import { useGetImageHubs } from '../page-private-image-hub/use-get-image-hubs';
import { ImageHubSecretStatusBadge } from '../status-badges/image-hub-secret-status-badge';
import { getPrivateImageHubUrl } from '../../utils/routing';
import { sortCompareString } from '../../utils/sort-utils';

export interface ImageHubsTogglerProps {
  appName: string;
}

export const ImageHubsToggler: FunctionComponent<ImageHubsTogglerProps> = ({
  appName,
}) => {
  const [getImageState] = useGetImageHubs(appName);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Private image hubs</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={getImageState}>
            {getImageState.data?.length > 0 ? (
              <List className="o-indent-list secrets">
                {getImageState.data
                  .sort((a, b) => sortCompareString(a.server, b.server))
                  .map(({ server, status }) => (
                    <List.Item key={server}>
                      <Link to={getPrivateImageHubUrl(appName, server)}>
                        <Typography link as="span">
                          {server}
                        </Typography>
                      </Link>
                      <ImageHubSecretStatusBadge status={status} />
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
