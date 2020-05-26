import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveWBS from './use-save-wbs';

import Alert from '../alert';
import FormField from '../form-field';
import Button from '../button';
import Panel from '../panel';
import Spinner from '../spinner';
import Toggler from '../toggler';

import requestStates from '../../state/state-utils/request-states';

export const ChangeWBSForm = (props) => {
  const [savedWBS, setSavedWBS] = useState(props.wbs);
  const [wbs, setWBS] = useState(props.wbs);
  const [saveState, saveFunc, resetState] = useSaveWBS(props.appName);

  useEffect(() => setWBS(props.wbs), [props.wbs]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFunc(wbs);
    setSavedWBS(wbs);
  };

  const setWBSAndResetSaveState = (wbs) => {
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setWBS(wbs);
  };

  return (
    <Panel>
      <Toggler summary="Change WBS">
        <form onSubmit={handleSubmit}>
          {saveState.status === requestStates.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change WBS. {saveState.error}
            </Alert>
          )}
          <fieldset disabled={saveState.status === requestStates.IN_PROGRESS}>
            <FormField help="WBS of the application for cost allocation">
              <input
                name="wbs"
                type="text"
                value={wbs}
                onChange={(ev) => setWBSAndResetSaveState(ev.target.value)}
              />
            </FormField>
            <div className="o-action-bar">
              {saveState.status === requestStates.IN_PROGRESS && (
                <Spinner>Updating…</Spinner>
              )}
              <Button
                btnType="danger"
                type="submit"
                disabled={savedWBS === wbs}
              >
                Change WBS
              </Button>
            </div>
          </fieldset>
        </form>
      </Toggler>
    </Panel>
  );
};

ChangeWBSForm.propTypes = {
  appName: PropTypes.string.isRequired,
  wbs: PropTypes.string.isRequired,
};

export default ChangeWBSForm;
