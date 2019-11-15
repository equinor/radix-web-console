import React from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/simple-async-resource';
import Panel from '../panel';
import Toggler from '../toggler';
import SecretStatus from '../secret-status';

import useGetBuildSecrets from '../page-build-secrets/use-get-build-secrets';

import * as routing from '../../utils/routing';

const BuildSecretsToggler = props => {
  const getBuildSecretsState = useGetBuildSecrets(props.appName);
  const data = getBuildSecretsState.data;

  return (
    <Panel>
      <Toggler summary="Build secrets">
        <AsyncResource asyncState={getBuildSecretsState}>
          {!data || data.length === 0 ? (
            <p>This app has no build secrets</p>
          ) : (
            <ul className="o-indent-list">
              {data
                .sort((a, b) => (a.name < b.name ? -1 : 1))
                .map(buildSecret => (
                  <li key={buildSecret.name}>
                    <Link
                      to={routing.getBuildSecretUrl(
                        props.appName,
                        buildSecret.name
                      )}
                    >
                      {buildSecret.name}
                    </Link>{' '}
                    <SecretStatus secret={buildSecret} />
                  </li>
                ))}
            </ul>
          )}
        </AsyncResource>
      </Toggler>
    </Panel>
  );
};

export default BuildSecretsToggler;
