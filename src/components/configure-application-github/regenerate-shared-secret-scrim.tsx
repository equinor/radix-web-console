import { Button, Progress, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useRegenerateSharedSecretMutation } from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils/parse-errors';
import { Alert } from '../alert';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ScrimPopup } from '../scrim-popup';

type Props = {
  appName: string;
  refetchSecrets: () => Promise<unknown>;
};

export function RegenerateSharedSecretScrim({
  appName,
  refetchSecrets,
}: Props) {
  const [show, setShow] = useState(false);

  const [regenerateSecrets, regenerateSecretState] =
    useRegenerateSharedSecretMutation();

  const onRegenerate = handlePromiseWithToast(async () => {
    setShow(false);
    await regenerateSecrets({
      appName,
      regenerateSharedSecretData: {
        sharedSecret: crypto.randomUUID(),
      },
    }).unwrap();
    await refetchSecrets();
  });

  return (
    <>
      <ScrimPopup
        title={'Warning'}
        open={!!show}
        onClose={() => setShow(false)}
        isDismissable
      >
        <div className="grid grid--gap-medium grid--auto-columns regenerate-content">
          <div className="regenerate-options">
            <Typography>
              Do you want to <strong>regenerate</strong> webhook secret?
            </Typography>
            <Typography>
              New webhook secret need to be put to the GitHub repository
              settings
            </Typography>
          </div>

          <Button.Group>
            <Button onClick={onRegenerate}>Rerun</Button>
            <Button variant="outlined" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Button.Group>
        </div>
      </ScrimPopup>

      <div>
        <div className="o-action-bar">
          {regenerateSecretState.isError ? (
            <Alert type="danger">
              Failed to regenerate webhook secret.
              <br />
              {getFetchErrorMessage(regenerateSecretState.error)}
            </Alert>
          ) : null}
          {regenerateSecretState.isLoading ? (
            <>
              <Progress.Circular size={16} /> Regenerating…
            </>
          ) : (
            <div>
              <Typography variant="h5">
                Regularly regenerate webhook secret
              </Typography>
              <Button onClick={() => setShow(true)}>Regenerate</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
