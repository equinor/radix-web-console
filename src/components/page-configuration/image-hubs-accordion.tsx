import { Accordion, List, Typography } from '@equinor/eds-core-react';
import { type ReactNode, useState } from 'react';
import { pollingInterval } from '../../store/defaults';
import {
  type ImageHubSecret,
  radixApi,
  useGetPrivateImageHubsQuery,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils/parse-errors';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';
import AsyncResource from '../async-resource/async-resource';
import { errorToast, successToast } from '../global-top-nav/styled-toaster';
import { ScrimPopup } from '../scrim-popup';
import { SecretForm } from '../secret-form';
import { ImageHubSecretStatusBadge } from '../status-badges/image-hub-secret-status-badge';

import './style.css';

interface FormProps {
  appName: string;
  secret: ImageHubSecret;
  fetchSecret: () => void;
  onSave?: () => void;
}
function ImageHubForm({ appName, secret, fetchSecret, onSave }: FormProps) {
  const [trigger, { isLoading }] =
    radixApi.endpoints.updatePrivateImageHubsSecretValue.useMutation();

  return (
    <SecretForm
      secret={secret}
      updated={secret.updated}
      secretName={secret.server}
      disableForm={isLoading}
      disableSave={isLoading}
      onSave={async (value): Promise<boolean> => {
        try {
          await trigger({
            appName,
            serverName: secret.server,
            secretParameters: { secretValue: value },
          }).unwrap();

          fetchSecret();
          onSave?.();
          successToast('Saved');
        } catch (error) {
          errorToast(`Error while saving. ${getFetchErrorMessage(error)}`);
          return false;
        }

        return true;
      }}
      overview={
        <div>
          <Typography>
            Server <strong>{secret.server}</strong>
          </Typography>
          <Typography>
            Username <strong>{secret.username}</strong>
          </Typography>
        </div>
      }
    />
  );
}

type SecretLinkProp = {
  title: string;
  scrimTitle?: ReactNode;
} & FormProps;
const SecretLink = ({ title, scrimTitle, ...rest }: SecretLinkProp) => {
  const [visibleScrim, setVisibleScrim] = useState(false);

  return (
    <div>
      <Typography
        link
        onClick={() => setVisibleScrim(!visibleScrim)}
        token={{ textDecoration: 'none' }}
      >
        {title}
      </Typography>

      <ScrimPopup
        className="image-hub__scrim"
        title={scrimTitle || title}
        open={visibleScrim}
        isDismissable
        onClose={() => setVisibleScrim(false)}
      >
        <div className="image-hub__scrim-content">
          <ImageHubForm {...rest} onSave={() => setVisibleScrim(false)} />
        </div>
      </ScrimPopup>
    </div>
  );
};

type Props = {
  appName: string;
};
export function ImageHubsAccordion({ appName }: Props) {
  const { data, refetch, ...state } = useGetPrivateImageHubsQuery(
    { appName },
    { skip: !appName, pollingInterval }
  );

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography as={Accordion.HeaderTitle}>Private image hubs</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={state}>
            {data && data.length > 0 ? (
              <List className="o-indent-list">
                {dataSorter(data, [
                  (x, y) => sortCompareString(x.server, y.server),
                ]).map((secret) => (
                  <List.Item key={secret.server}>
                    <div className="grid grid--gap-large grid--auto-columns">
                      <SecretLink
                        title={secret.server}
                        scrimTitle={`${secret.server}: password`}
                        fetchSecret={refetch}
                        {...{ appName, secret }}
                      />

                      <ImageHubSecretStatusBadge
                        status={secret.status ?? 'Pending'}
                      />
                    </div>
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
}
