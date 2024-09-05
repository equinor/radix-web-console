import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { type FunctionComponent, type ReactNode, useState } from 'react';

import { pollingInterval } from '../../store/defaults';
import {
  type BuildSecret,
  useGetBuildSecretsQuery,
  useUpdateBuildSecretsSecretValueMutation,
} from '../../store/radix-api';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';
import AsyncResource from '../async-resource/async-resource';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ScrimPopup } from '../scrim-popup';
import { SecretForm } from '../secret-form';
import { BuildSecretStatusBadge } from '../status-badges/build-secret-status-badge';

import './style.css';

const BuildSecretForm: FunctionComponent<{
  appName: string;
  secret: BuildSecret;
  fetchSecret: () => void;
  onSave: () => void;
}> = ({ appName, secret, fetchSecret, onSave }) => {
  const [mutate, { isLoading }] = useUpdateBuildSecretsSecretValueMutation();

  const onSaveSecret = handlePromiseWithToast(async (secretValue: string) => {
    await mutate({
      appName,
      secretName: secret.name,
      secretParameters: { secretValue },
    }).unwrap();

    fetchSecret();
    onSave();
    return true;
  });

  return (
    <SecretForm
      secret={secret}
      secretName={secret.name}
      disableForm={isLoading}
      disableSave={isLoading}
      onSave={onSaveSecret}
    />
  );
};

const SecretLink: FunctionComponent<
  { title?: string; scrimTitle?: ReactNode } & Pick<
    Parameters<typeof BuildSecretForm>[0],
    'appName' | 'fetchSecret' | 'secret'
  >
> = ({ secret, title, scrimTitle, ...rest }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);

  return (
    <div>
      <Typography
        link
        onClick={() => setVisibleScrim(!visibleScrim)}
        token={{ textDecoration: 'none' }}
      >
        {title || secret.name}
      </Typography>

      <ScrimPopup
        className="image-hub__scrim"
        title={scrimTitle || title}
        open={visibleScrim}
        isDismissable
        onClose={() => setVisibleScrim(false)}
      >
        <div className="image-hub__scrim-content">
          <BuildSecretForm
            secret={secret}
            {...rest}
            onSave={() => setVisibleScrim(false)}
          />
        </div>
      </ScrimPopup>
    </div>
  );
};

export const BuildSecretsAccordion: FunctionComponent<{ appName: string }> = ({
  appName,
}) => {
  const { data, refetch, ...state } = useGetBuildSecretsQuery(
    { appName },
    { skip: !appName, pollingInterval }
  );

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography as={Accordion.HeaderTitle}>Build secrets</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={state}>
            {data?.length > 0 ? (
              <List className="o-indent-list">
                {dataSorter(data, [
                  (x, y) => sortCompareString(x.name, y.name),
                ]).map((secret) => (
                  <List.Item key={secret.name}>
                    <div className="grid grid--gap-large grid--auto-columns">
                      <SecretLink
                        title={secret.name}
                        fetchSecret={refetch}
                        {...{ appName, secret }}
                      />

                      <BuildSecretStatusBadge status={secret.status} />
                    </div>
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

BuildSecretsAccordion.propTypes = {
  appName: PropTypes.string.isRequired,
};
