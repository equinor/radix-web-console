import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import { SecretStatus } from '../secret-status';
import useGetBuildSecrets from '../page-build-secret/use-get-build-secrets';
import { getBuildSecretUrl } from '../../utils/routing';

export const BuildSecretsToggler = (props) => {
  const [getBuildSecretsState] = useGetBuildSecrets(props.appName);
  const data = getBuildSecretsState.data;

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>Build secrets</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={getBuildSecretsState}>
            {data?.length > 0 ? (
              <List className="o-indent-list secrets">
                {data
                  .sort((a, b) => (a.name < b.name ? -1 : 1))
                  .map((buildSecret) => (
                    <List.Item key={buildSecret.name}>
                      <Link
                        to={getBuildSecretUrl(props.appName, buildSecret.name)}
                      >
                        <Typography link as="span">
                          {buildSecret.name}
                        </Typography>
                      </Link>
                      <SecretStatus secret={buildSecret} />
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
