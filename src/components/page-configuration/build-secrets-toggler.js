import React from 'react';
import { Link } from 'react-router-dom';
import AsyncResource from '../async-resource/simple-async-resource';
import SecretStatus from '../secret-status';
import useGetBuildSecrets from '../page-build-secret/use-get-build-secrets';
import * as routing from '../../utils/routing';
import { Accordion, List, Typography } from '@equinor/eds-core-react';

const BuildSecretsToggler = (props) => {
  const [getBuildSecretsState] = useGetBuildSecrets(props.appName);
  const data = getBuildSecretsState.data;

  return (
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Build secrets</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <AsyncResource asyncState={getBuildSecretsState}>
          {!data || data.length === 0 ? (
            <Typography>This app has no build secrets</Typography>
          ) : (
            <List className="o-indent-list secrets">
              {data
                .sort((a, b) => (a.name < b.name ? -1 : 1))
                .map((buildSecret) => (
                  <List.Item key={buildSecret.name}>
                    <Link
                      to={routing.getBuildSecretUrl(
                        props.appName,
                        buildSecret.name
                      )}
                    >
                      <Typography link as="span">
                        {buildSecret.name}
                      </Typography>
                    </Link>
                    <SecretStatus secret={buildSecret} />
                  </List.Item>
                ))}
            </List>
          )}
        </AsyncResource>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default BuildSecretsToggler;
