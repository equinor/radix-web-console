import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Alert } from '../alert';
import { SecretStatus } from '../secret-status';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

const STATUS_OK = 'Consistent';

const getSecretFieldHelpText = (secret) =>
  secret.status === STATUS_OK ? 'Existing value will be overwritten' : null;

const shouldFormBeDisabled = (saveStatus, value, savedValue) =>
  [RequestState.IN_PROGRESS, RequestState.SUCCESS].includes(saveStatus) ||
  value === savedValue ||
  !value;

export const SecretForm = ({
  secret,
  saveState,
  saveError,
  resetSaveState,
  handleSubmit,
  secretName,
  overview,
  getSecret,
}) => {
  const [value, setValue] = useState();
  const [savedValue, setSavedValue] = useState();

  useEffect(() => {
    if (
      [RequestState.FAILURE, RequestState.SUCCESS].includes(saveState) &&
      savedValue !== value
    ) {
      resetSaveState();
    } else if (RequestState.IN_PROGRESS === saveState) {
      setSavedValue(value);
    }
  }, [value, savedValue, saveState, resetSaveState]);

  useEffect(() => {
    if (saveState === RequestState.SUCCESS) {
      getSecret();
    }
  }, [saveState, getSecret]);

  return (
    <main>
      {secret ? (
        <>
          <div className="grid grid--gap-medium">
            <Typography variant="h4">Overview</Typography>
            {overview || (
              <Typography variant="body_short">
                Secret <strong>{secretName}</strong>
              </Typography>
            )}
            <div className="secret-status">
              <Typography variant="body_short">Status</Typography>
              <SecretStatus secret={secret} />
            </div>
            <div className="secret-overview-form">
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  handleSubmit(value);
                }}
              >
                <fieldset
                  disabled={saveState === RequestState.IN_PROGRESS}
                  className="grid grid--gap-small"
                >
                  <TextField
                    label="Secret value"
                    helperText={getSecretFieldHelpText(secret)}
                    onChange={(ev) => setValue(ev.target.value)}
                    value={value}
                    multiline
                  />
                  {saveState === RequestState.FAILURE && (
                    <div>
                      <Alert type="danger">
                        Error while saving. {saveError}
                      </Alert>
                    </div>
                  )}
                  {saveState === RequestState.SUCCESS && (
                    <div>
                      <Alert type="info">Saved</Alert>
                    </div>
                  )}
                  {saveState === RequestState.IN_PROGRESS && (
                    <CircularProgress>Saving…</CircularProgress>
                  )}
                  <div>
                    <Button
                      type="submit"
                      disabled={shouldFormBeDisabled(
                        saveState,
                        value,
                        savedValue
                      )}
                    >
                      Save
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </>
      ) : (
        'No secret…'
      )}
    </main>
  );
};

SecretForm.propTypes = {
  saveError: PropTypes.string,
  saveState: PropTypes.oneOf(Object.values(RequestState)),
  secret: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  resetSaveState: PropTypes.func.isRequired,
  getSecret: PropTypes.func.isRequired,
};

export default SecretForm;
