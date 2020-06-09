import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveRepository from './use-save-repository';

import Alert from '../alert';
import FormField from '../form-field';
import Button from '../button';
import Panel from '../panel';
import Spinner from '../spinner';
import Toggler from '../toggler';

import requestStates from '../../state/state-utils/request-states';

export const ChangeRepositoryForm = (props) => {
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
      </Toggler>
    </Panel>
  );
};

ChangeRepositoryForm.propTypes = {
  appName: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

export default ChangeRepositoryForm;
