import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Alert from '../alert';
import Button from '../button';
import FormField from '../form-field';
import Panel from '../panel';
import SecretStatus from '../secret-status';
import Spinner from '../spinner';

import requestStates from '../../state/state-utils/request-states';

import './style.css';

const STATUS_OK = 'Consistent';

const getSecretFieldHelpText = secret =>
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
          <h2 className="o-heading-section">Overview</h2>
          {overview}
          <p>
            Status <SecretStatus secret={secret} />
          </p>
          <div className="secret-overview-form">
            <Panel>
              <form
                onSubmit={ev => {
                  ev.preventDefault();
                  handleSubmit(value);
                }}
              >
                <fieldset disabled={saveState === requestStates.IN_PROGRESS}>
                  <FormField
                    label="Secret value"
                    help={getSecretFieldHelpText(secret)}
                  >
                    <textarea
                      onChange={ev => setValue(ev.target.value)}
                      value={value}
                    />
                  </FormField>
                  {saveState === requestStates.FAILURE && (
                    <Alert type="danger">Error while saving. {saveError}</Alert>
                  )}
                  {saveState === requestStates.SUCCESS && (
                    <Alert type="info">Saved</Alert>
                  )}
                  <div className="o-action-bar">
                    {saveState === requestStates.IN_PROGRESS && (
                      <Spinner>Saving…</Spinner>
                    )}
                    <Button
                      btnType="primary"
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
            </Panel>
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
