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
    <Accordion.Item className="accordion__item">
      <Accordion.Header className="accordion__header body_short">
        Build secrets
      </Accordion.Header>
      <Accordion.Panel className="accordion__panel">
        <AsyncResource asyncState={getBuildSecretsState}>
          {!data || data.length === 0 ? (
            <p>This app has no build secrets</p>
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
