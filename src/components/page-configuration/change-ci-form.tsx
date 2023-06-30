import {
  Accordion,
  Button,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSaveConfigurationItem } from './use-save-ci';

import { Alert } from '../alert';
import { AppConfigConfigurationItem } from '../app-config-ci';
import { AppDispatch } from '../../init/store';
import { ApplicationModel } from '../../models/servicenow-api/models/service-now-application';
import { RequestState } from '../../state/state-utils/request-states';
import { refreshApp } from '../../state/subscriptions/action-creators';

export interface ChangeConfigurationItemFormProps {
  appName: string;
  configurationItem?: string;
}

export const ChangeConfigurationItemForm = ({
  appName,
  configurationItem,
}: ChangeConfigurationItemFormProps): JSX.Element => {
  const [newCI, setNewCI] = useState<ApplicationModel>();
  const [saveState, saveFunc, resetState] = useSaveConfigurationItem(appName);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (saveState.status === RequestState.SUCCESS) {
      resetState();
      setNewCI(null);
      dispatch(refreshApp(appName));
    }
  }, [saveState, resetState, dispatch, appName]);

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    saveFunc(newCI.id);
  }

  const isDirty = newCI && newCI.id !== configurationItem;
  const isSaving = saveState.status === RequestState.IN_PROGRESS;

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item style={{ overflow: 'visible' }}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change configuration item</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
            {saveState.status === RequestState.FAILURE && (
              <div>
                <Alert type="danger">
                  <Typography>
                    Failed to change Configuration Item. {saveState.error}
                  </Typography>
                </Alert>
              </div>
            )}
            <AppConfigConfigurationItem
              configurationItem={configurationItem}
              configurationItemChangeCallback={setNewCI}
              disabled={isSaving}
            />
            <div>
              {saveState.status === RequestState.IN_PROGRESS ? (
                <>
                  <CircularProgress size={24} /> Updating…
                </>
              ) : (
                <Button color="danger" type="submit" disabled={!isDirty}>
                  Change configuration item
                </Button>
              )}
            </div>
          </form>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ChangeConfigurationItemForm.propTypes = {
  appName: PropTypes.string.isRequired,
  configurationItem: PropTypes.string,
} as PropTypes.ValidationMap<ChangeConfigurationItemFormProps>;
