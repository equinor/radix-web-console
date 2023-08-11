import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import { useGetBuildSecrets } from '../page-build-secret/use-get-build-secrets';
import { BuildSecretStatusBadge } from '../status-badges/build-secret-status-badge';
import { getBuildSecretUrl } from '../../utils/routing';
import { sortCompareString } from '../../utils/sort-utils';

export interface BuildSecretsTogglerProps {
  appName: string;
}

export const BuildSecretsToggler: FunctionComponent<
  BuildSecretsTogglerProps
> = ({ appName }) => {
  const [buildSecretsState] = useGetBuildSecrets(appName);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Build secrets</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={buildSecretsState}>
            {buildSecretsState.data?.length > 0 ? (
              <List className="o-indent-list secrets">
                {buildSecretsState.data
                  .sort((a, b) => sortCompareString(a.name, b.name))
                  .map(({ name, status }) => (
                    <List.Item key={name}>
                      <Link to={getBuildSecretUrl(appName, name)}>
                        <Typography link as="span">
                          {name}
                        </Typography>
                      </Link>
                      <BuildSecretStatusBadge status={status} />
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
