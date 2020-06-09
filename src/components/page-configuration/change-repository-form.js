import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveRepository from './use-save-repository';

import Alert from '../alert';
import FormField, { FormGroup } from '../form-field';
import Button from '../button';
import Panel from '../panel';
import Spinner from '../spinner';
import Toggler from '../toggler';

import requestStates from '../../state/state-utils/request-states';
import Code from '../code';

const imageDeployKey = require('./deploy-key.png');

export const ChangeRepositoryForm = (props) => {
  const app = props.app;
  const [savedRepository, setSavedRepository] = useState(props.repository);
  const [repository, setRepository] = useState(props.repository);
  const [saveState, saveFunc, resetState] = useSaveRepository(props.appName);

  useEffect(() => setRepository(props.repository), [props.repository]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFunc(repository);
    setSavedRepository(repository);
  };

  const setRepositoryAndResetSaveState = (repository) => {
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setRepository(repository);
  };

  return (
    <Panel>
      <Toggler summary="Change GitHub repository">
        <div>
          <form onSubmit={handleSubmit}>
            {saveState.status === requestStates.FAILURE && (
              <Alert type="danger" className="gap-bottom">
                Failed to change repository. {saveState.error}
              </Alert>
            )}
            <fieldset disabled={saveState.status === requestStates.IN_PROGRESS}>
              <FormField help="Full URL, e.g. 'https://github.com/equinor/my-app'">
                <input
                  name="repository"
                  type="url"
                  value={repository}
                  onChange={(ev) =>
                    setRepositoryAndResetSaveState(ev.target.value)
                  }
                />
              </FormField>
              <div className="o-action-bar">
                {saveState.status === requestStates.IN_PROGRESS && (
                  <Spinner>Updating…</Spinner>
                )}
                <Button
                  btnType="danger"
                  type="submit"
                  disabled={savedRepository === repository}
                >
                  Change repository
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
        <FormGroup label="Move the Deploy Key the the new repository">
          <div className="o-body-text">
            <ol>
              <li>
                Open the{' '}
                <a
                  href={`${app.repository}/settings/keys`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Deploy Key page
                </a>{' '}
                to delete the Deploy Key from the previous repository
              </li>
              <li>
                Open the{' '}
                <a
                  href={`${props.repository}/settings/keys/new`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Add New Deploy Key
                </a>{' '}
                and follow the steps below
                <img
                  alt="'Add deploy key' steps on GitHub"
                  src={imageDeployKey}
                  srcSet={`${imageDeployKey} 2x`}
                />
              </li>
              <li>Give the key a name, e.g. "Radix deploy key"</li>
              <li>
                Copy and paste this key:
                <Code copy wrap>
                  {app.publicKey}
                </Code>
              </li>
              <li>Press "Add key"</li>
            </ol>
          </div>
        </FormGroup>
      </Toggler>
    </Panel>
  );
};

ChangeRepositoryForm.propTypes = {
  appName: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

export default ChangeRepositoryForm;
