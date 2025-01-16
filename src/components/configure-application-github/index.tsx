import {
  Accordion,
  Button,
  List,
  Progress,
  Typography,
} from '@equinor/eds-core-react';
import { useState } from 'react';

import { Alert } from '../alert';
import { Code } from '../code';
import imageDeployKey from './deploy-key02.png';

import './style.css';
import type {
  ApplicationRegistration,
  DeployKeyAndSecret,
  RegenerateDeployKeyApiArg,
  RegenerateDeployKeyApiResponse,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ExternalLink } from '../link/external-link';
import { ScrimPopup } from '../scrim-popup';

interface Props {
  app: ApplicationRegistration;
  secrets?: DeployKeyAndSecret;
  refetch: () => unknown;
  startVisible?: boolean;
  onRegenerateSecrets: (
    data: RegenerateDeployKeyApiArg
  ) => Promise<RegenerateDeployKeyApiResponse>;
  onRefreshSecrets: () => Promise<unknown>;
}

export const ConfigureApplicationGithub = ({
  app,
  refetch,
  secrets,
  startVisible,
  onRegenerateSecrets,
  onRefreshSecrets,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const isExpanded = !!startVisible;
  const [visibleRegenerateScrim, setVisibleRegenerateScrim] =
    useState<boolean>(false);

  const onRegenerate = handlePromiseWithToast(async () => {
    try {
      setLoading(true);
      setVisibleRegenerateScrim(false);
      await onRegenerateSecrets({
        appName: app.name,
        regenerateDeployKeyAndSecretData: { sharedSecret: crypto.randomUUID() },
      });
      await onRefreshSecrets();
      await refetch?.();
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, 'Successfully regenerated deploy key and webhook secret');

  return (
    <div className="configure-application-github grid grid--gap-medium">
      <Typography>
        To integrate with GitHub you must add a deploy key and a webhook
      </Typography>
      <div className="grid grid--gap-small">
        <Accordion className="accordion" chevronPosition="right">
          <Accordion.Item isExpanded={isExpanded}>
            <Accordion.Header>
              <Accordion.HeaderTitle>
                <Typography>Add deploy key</Typography>
              </Accordion.HeaderTitle>
            </Accordion.Header>
            <Accordion.Panel>
              <div className="grid grid--gap-medium">
                <Typography>
                  This allows Radix to clone the repository. Open the{' '}
                  <ExternalLink href={`${app.repository}/settings/keys/new`}>
                    Add New Deploy Key page
                  </ExternalLink>{' '}
                  and follow the steps below
                </Typography>
                <div className="grid grid--gap-medium o-body-text">
                  <img
                    alt="'Add deploy key' steps on GitHub"
                    src={imageDeployKey}
                    srcSet={`${imageDeployKey} 2x`}
                  />
                  <List variant="numbered">
                    <List.Item>
                      Give the key a name, e.g. "Radix deploy key"
                    </List.Item>
                    <List.Item>
                      {secrets?.publicDeployKey ? (
                        <section className="deploy-key">
                          Copy and paste this key:
                          <Code copy>{secrets?.publicDeployKey}</Code>
                        </section>
                      ) : (
                        <>
                          <Progress.Circular size={16} /> Please wait…
                        </>
                      )}
                    </List.Item>
                    <List.Item>Press "Add key"</List.Item>
                  </List>
                </div>
                <div>
                  <div className="o-action-bar">
                    {error ? (
                      <Alert type="danger">
                        Failed to regenerate deploy key and webhook secret.
                        <br />
                        {getFetchErrorMessage(error)}
                      </Alert>
                    ) : null}
                    {loading ? (
                      <>
                        <Progress.Circular size={16} /> Regenerating…
                      </>
                    ) : (
                      <>
                        <ScrimPopup
                          title={'Warning'}
                          open={!!visibleRegenerateScrim}
                          onClose={() => setVisibleRegenerateScrim(false)}
                          isDismissable
                        >
                          <div className="grid grid--gap-medium grid--auto-columns regenerate-content">
                            <div className="regenerate-options">
                              <Typography>
                                Do you want to <strong>regenerate</strong>{' '}
                                deploy key and webhook secret?
                              </Typography>
                              <Typography>
                                New deploy key and webhook secret need to be put
                                to the GitHub repository settings
                              </Typography>
                            </div>

                            <Button.Group>
                              <Button onClick={onRegenerate}>Rerun</Button>
                              <Button
                                variant="outlined"
                                onClick={() => setVisibleRegenerateScrim(false)}
                              >
                                Cancel
                              </Button>
                            </Button.Group>
                          </div>
                        </ScrimPopup>
                        {!loading && secrets?.publicDeployKey && (
                          <div>
                            <Typography variant="h5">
                              Regularly regenerate deploy key and webhook secret
                            </Typography>
                            <Button
                              onClick={() => setVisibleRegenerateScrim(true)}
                            >
                              Regenerate
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};
