import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import { useGetBuildSecrets } from '../page-build-secret/use-get-build-secrets';
import { BuildSecretStatusBadge } from '../status-badges/build-secret-status-badge';
import { getBuildSecretUrl } from '../../utils/routing';
import { sortCompareString } from '../../utils/sort-utils';

export const BuildSecretsToggler = (props) => {
  const [buildSecretsState] = useGetBuildSecrets(props.appName);
  const data = buildSecretsState.data;

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>Build secrets</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={buildSecretsState}>
            {data?.length > 0 ? (
              <List className="o-indent-list secrets">
                {data
                  .sort((a, b) => sortCompareString(a.name, b.name))
                  .map((buildSecret) => (
                    <List.Item key={buildSecret.name}>
                      <Link
                        to={getBuildSecretUrl(props.appName, buildSecret.name)}
                      >
                        <Typography link as="span">
                          {buildSecret.name}
                        </Typography>
                      </Link>
                      <BuildSecretStatusBadge status={buildSecret.status} />
                    </List.Item>
                  ))}
              </List>
            ) : (
              <Typography>This app has no build secrets</Typography>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

BuildSecretsToggler.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default BuildSecretsToggler;
