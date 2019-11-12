import React, { useState } from 'react';
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

const shouldFormBeDisabled = saveStatus =>
  [requestStates.IN_PROGRESS, requestStates.SUCCESS].includes(saveStatus);

const secretForm = props => {
  const [value, setValue] = useState();

  return (
    <main>
      {!props.secret && 'No secret…'}
      {props.secret && (
        <React.Fragment>
          <h2 className="o-heading-section">Overview</h2>
          {props.overview}
          <p>
            Status <SecretStatus secret={props.secret} />
          </p>
          <div className="secret-overview-form">
            <Panel>
              <form
                onSubmit={ev => {
                  ev.preventDefault();
                  props.handleSubmit(value);
                }}
              >
                <fieldset disabled={shouldFormBeDisabled(props.saveState)}>
                  <FormField
                    label="Secret value"
                    help={getSecretFieldHelpText(props.secret)}
                  >
                    <textarea
                      onChange={ev => setValue(ev.target.value)}
                      value={value}
                    />
                  </FormField>
                  {props.saveState === requestStates.FAILURE && (
                    <Alert type="danger">
                      Error while saving. {props.saveError}
                    </Alert>
                  )}
                  {props.saveState === requestStates.SUCCESS && (
                    <Alert type="info">Saved</Alert>
                  )}
                  <div className="o-action-bar">
                    {props.saveState === requestStates.IN_PROGRESS && (
                      <Spinner>Saving…</Spinner>
                    )}
                    <Button btnType="primary" type="submit">
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

secretForm.propTypes = {
  saveError: PropTypes.string,
  saveState: PropTypes.oneOf(Object.values(requestStates)),
  secret: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
};

export default secretForm;
