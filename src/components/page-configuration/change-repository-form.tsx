import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  List,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { type ChangeEvent, type FormEvent, useState } from 'react';

import imageDeployKey from '../configure-application-github/deploy-key02.png';
import imageWebhook from '../configure-application-github/webhook01.png';

import { Alert } from '../alert';
import AsyncResource from '../async-resource/async-resource';
import { Code } from '../code';
import { CompactCopyButton } from '../compact-copy-button';
import { configVariables } from '../../utils/config';
import {
  useGetDeployKeyAndSecretQuery,
  useModifyRegistrationDetailsMutation,
} from '../../store/radix-api';
import { pollingInterval } from '../../store/defaults';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorMessage } from '../../store/utils';

const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

const DeployKey = ({ appName }: { appName: string }) => {
  const { data: deployKeAndSecret, ...depAndSecState } =
    useGetDeployKeyAndSecretQuery({ appName }, { pollingInterval });

  return (
    <AsyncResource asyncState={depAndSecState}>
      <Code copy>{deployKeAndSecret?.publicDeployKey}</Code>
    </AsyncResource>
  );
};

interface Props {
  appName: string;
  repository: string;
  refetch?: Function;
  sharedSecret: string;
}
export function ChangeRepositoryForm({
  appName,
  repository,
  refetch,
  sharedSecret,
}: Props) {
  const [currentRepository, setCurrentRepository] = useState(repository);
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [mutate, { isLoading, error, data: modifyState, isSuccess }] =
    useModifyRegistrationDetailsMutation();

  const webhookURL = `https://webhook.${radixZoneDNS}/events/github?appName=${appName}`;

  const handleSubmit = handlePromiseWithToast(async (ev: FormEvent) => {
    ev.preventDefault();

    await mutate({
      appName,
      applicationRegistrationPatchRequest: {
        applicationRegistrationPatch: {
          repository: currentRepository,
        },
        acknowledgeWarnings: useAcknowledgeWarnings,
      },
    }).unwrap();

    await refetch?.();
  });

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change GitHub repository</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
              {error && (
                <div>
                  <Alert type="danger">
                    Failed to change repository. {getFetchErrorMessage(error)}
                  </Alert>
                </div>
              )}
              <TextField
                id="githubUrlField"
                disabled={isLoading}
                type="url"
                value={currentRepository ?? repository ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCurrentRepository(e.target.value)
                }
                label="URL"
                helperText="e.g. 'https://github.com/equinor/my-app'"
              />
              {isLoading && (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              )}
              {!isLoading && modifyState?.warnings && (
                <div className="grid grid--gap-medium">
                  <List>
                    {modifyState?.warnings.map((warning, i) => (
                      <List.Item key={i}>
                        <Alert type="warning">{warning}</Alert>
                      </List.Item>
                    ))}
                  </List>
                  <Checkbox
                    label="Proceed with warnings"
                    name="acknowledgeWarnings"
                    checked={useAcknowledgeWarnings}
                    onChange={() =>
                      setAcknowledgeWarnings(!useAcknowledgeWarnings)
                    }
                  />
                </div>
              )}
              {!isLoading && (
                <div>
                  <Button
                    color="danger"
                    type="submit"
                    disabled={
                      currentRepository === repository ||
                      currentRepository.length < 5 ||
                      (modifyState?.warnings && !useAcknowledgeWarnings)
                    }
                  >
                    Change repository
                  </Button>
                </div>
              )}
            </form>
            {!isLoading && isSuccess && (
              <>
                <Typography variant="body_short_bold">
                  Move the Deploy Key to the new repository
                </Typography>
                <div className="o-body-text grid grid--gap-medium">
                  <List variant="numbered">
                    <List.Item>
                      Open the{' '}
                      <Typography
                        link
                        href={`${repository}/settings/keys`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Deploy Key page
                      </Typography>{' '}
                      to delete the Deploy Key from the previous repository
                    </List.Item>
                    <List.Item>
                      Open the{' '}
                      <Typography
                        link
                        href={`${repository}/settings/keys/new`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Add New Deploy Key
                      </Typography>{' '}
                      and follow the steps below
                    </List.Item>
                  </List>
                  <img
                    alt="'Add deploy key' steps on GitHub"
                    src={imageDeployKey}
                    srcSet={`${imageDeployKey} 2x`}
                  />
                  <List variant="numbered" start="3">
                    <List.Item>
                      Give the key a name, e.g. "Radix deploy key"
                    </List.Item>
                    <List.Item>Copy and paste this key:</List.Item>
                  </List>
                  <DeployKey appName={appName} />
                  <List variant="numbered" start="5">
                    <List.Item>Press "Add key"</List.Item>
                  </List>
                </div>
                <Typography variant="body_short_bold">
                  Move the Webhook to the new repository
                </Typography>
                <div className="o-body-text">
                  <List variant="numbered" start="6">
                    <List.Item>
                      Open the{' '}
                      <Typography
                        link
                        href={`${repository}/settings/hooks`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Webhook page
                      </Typography>{' '}
                      of the previous repository and delete the existing Webhook
                    </List.Item>
                    <List.Item>
                      Open the{' '}
                      <Typography
                        link
                        href={`${repository}/settings/hooks/new`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Add Webhook page
                      </Typography>{' '}
                      and follow the steps below
                    </List.Item>
                  </List>
                  <img
                    alt="'Add webhook' steps on GitHub"
                    src={imageWebhook}
                    srcSet={`${imageWebhook} 2x`}
                  />
                  <List variant="numbered" start="8">
                    <List.Item>
                      As Payload URL, use <code>{webhookURL}</code>{' '}
                      <CompactCopyButton content={webhookURL} />
                    </List.Item>
                    <List.Item>
                      Choose <code>application/json</code> as Content type
                    </List.Item>
                    <List.Item>
                      The Shared Secret for this application is{' '}
                      <code>{sharedSecret}</code>{' '}
                      <CompactCopyButton content={sharedSecret} />
                    </List.Item>
                    <List.Item>Press "Add webhook"</List.Item>
                  </List>
                </div>
              </>
            )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

ChangeRepositoryForm.propTypes = {
  appName: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
  refetch: PropTypes.func,
  sharedSecret: PropTypes.string.isRequired,
};
