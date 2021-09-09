import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Alert from '../alert';
import SecretStatus from '../secret-status';

import requestStates from '../../state/state-utils/request-states';

import './style.css';
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';

const STATUS_OK = 'Consistent';

const getSecretFieldHelpText = (secret) =>
  secret.status === STATUS_OK ? 'Existing value will be overwritten' : null;

const shouldFormBeDisabled = (saveStatus, value, savedValue) =>
  [requestStates.IN_PROGRESS, requestStates.SUCCESS].includes(saveStatus) ||
  value === savedValue ||
  !value;

const SecretForm = ({
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
      [requestStates.FAILURE, requestStates.SUCCESS].includes(saveState) &&
      savedValue !== value
    ) {
      resetSaveState();
    } else if (requestStates.IN_PROGRESS === saveState) {
      setSavedValue(value);
    }
  }, [value, savedValue, saveState, resetSaveState]);

  useEffect(() => {
    if (saveState === requestStates.SUCCESS) {
      getSecret();
    }
  }, [saveState, getSecret]);

  return (
    <main>
      {!secret && 'No secret…'}
      {secret && (
        <React.Fragment>
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
                  disabled={saveState === requestStates.IN_PROGRESS}
                  className="grid grid--gap-small"
                >
                  <TextField
                    label="Secret value"
                    helperText={getSecretFieldHelpText(secret)}
                    onChange={(ev) => setValue(ev.target.value)}
                    value={value}
                    multiline
                  />
                  {saveState === requestStates.FAILURE && (
                    <div>
                      <Alert type="danger">
                        Error while saving. {saveError}
                      </Alert>
                    </div>
                  )}
                  {saveState === requestStates.SUCCESS && (
                    <div>
                      <Alert type="info">Saved</Alert>
                    </div>
                  )}
                  {saveState === requestStates.IN_PROGRESS && (
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
        </React.Fragment>
      )}
    </main>
  );
};

SecretForm.propTypes = {
  saveError: PropTypes.string,
  saveState: PropTypes.oneOf(Object.values(requestStates)),
  secret: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  resetSaveState: PropTypes.func.isRequired,
  getSecret: PropTypes.func.isRequired,
};

export default SecretForm;
