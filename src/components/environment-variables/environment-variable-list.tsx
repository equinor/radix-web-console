import {
  Button,
  CircularProgress,
  Icon,
  Table,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { edit, restore_page, save } from '@equinor/eds-icons';
import { useEffect, useState } from 'react';

import { UseSaveEnvVar } from './use-save-env-var';

import { Alert } from '../alert';
import { HomeIcon } from '../home-icon';
import { ComponentType } from '../../models/component-type';
import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalizedModel,
} from '../../models/environment-variable';
import { PoolingStateModel } from '../../models/pooling-state';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

export interface EnvironmentVariableListProps {
  appName: string;
  envName: string;
  componentName: string;
  componentType: ComponentType;
  setPoolingState: (props: PoolingStateModel) => void;
  envVars: Array<EnvironmentVariableNormalizedModel>;
  poolEnvVarsError?: string;
  includeRadixVars: boolean;
  readonly: boolean;
}

interface EditableEnvVars {
  currentValue: string;
  origEnvVar: EnvironmentVariableNormalizedModel;
}

const checkHasNonRadixEnvVars = (list: EditableEnvVars[]) =>
  !!list.find((x) => !x.origEnvVar.isRadixVariable);

const getUpdatableEnvVars = (
  list: Array<{ currentValue: string; origEnvVar: EnvironmentVariableModel }>
) =>
  list
    .filter(
      (editableEnvVar) =>
        editableEnvVar.currentValue !== editableEnvVar.origEnvVar.value
    )
    .map((editableEnvVar) => ({
      name: editableEnvVar.origEnvVar.name,
      value: editableEnvVar.currentValue,
    }));

const getEditableEnvVars = (
  includeRadixVars: boolean,
  envVars: EnvironmentVariableNormalizedModel[]
) =>
  envVars
    ?.filter((envVar) => includeRadixVars || !envVar.isRadixVariable)
    .map((envVar) => ({ currentValue: envVar.value, origEnvVar: envVar })) ||
  [];

export const EnvironmentVariableList = (
  props: EnvironmentVariableListProps
) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [saveState, saveFunc, resetState] = UseSaveEnvVar({
    appName: props.appName,
    envName: props.envName,
    componentName: props.componentName,
  });

  const [editableEnvVars, setEditableEnvVars] = useState<EditableEnvVars[]>([]);
  const [hasNonRadixEnvVars, setHasNonRadixEnvVars] = useState(false);

  useEffect(() => {
    if (inEditMode) {
      return;
    }

    const edEnvVars = getEditableEnvVars(props.includeRadixVars, props.envVars);
    setHasNonRadixEnvVars(checkHasNonRadixEnvVars(edEnvVars));
    setEditableEnvVars(edEnvVars);
  }, [props.includeRadixVars, inEditMode, props.envVars]);

  const handleSetEditMode = () => {
    props.setPoolingState({ paused: true });
    setInEditMode(true);
  };

  const handleSave = () => {
    if (props.readonly) {
      return;
    }

    const updatableEnvVars = getUpdatableEnvVars(editableEnvVars);
    if (updatableEnvVars.length > 0) {
      saveFunc(updatableEnvVars);
    }
    setInEditMode(false);
    props.setPoolingState({ paused: false });
  };

  const handleReset = () => {
    resetState();
    setInEditMode(false);
    props.setPoolingState({ paused: false });
  };

  return (
    <>
      <div className="section__heading_with_buttons grid grid--gap-medium">
        <Typography variant="h4">Environment variables</Typography>
        {editableEnvVars?.length > 0 &&
          !props.readonly &&
          hasNonRadixEnvVars &&
          (saveState.status === RequestState.IDLE ||
            saveState.status === RequestState.SUCCESS) && (
            <>
              {inEditMode ? (
                <div className="horizontal-buttons">
                  <Button variant="contained" onClick={() => handleSave()}>
                    <Icon data={save} /> Apply
                  </Button>
                  <Button variant="outlined" onClick={() => handleReset()}>
                    <Icon data={restore_page} /> Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button onClick={() => handleSetEditMode()}>
                    <Icon data={edit} /> Edit
                  </Button>
                </div>
              )}
            </>
          )}
      </div>

      {props.poolEnvVarsError && (
        <div>
          <Alert type="danger">
            Failed to get environment variables. {props.poolEnvVarsError}
          </Alert>
        </div>
      )}

      {saveState?.error && (
        <div>
          <Alert type="danger">
            Failed to save environment variables. {saveState.error}
          </Alert>
        </div>
      )}

      {editableEnvVars?.length > 0 && !props.readonly && inEditMode && (
        <Typography>
          {props.componentType === ComponentType.job
            ? 'Applied changes will be used for new started jobs'
            : 'Component needs to be restarted after applied changes'}
        </Typography>
      )}

      {editableEnvVars && !hasNonRadixEnvVars && (
        <Typography>
          This {props.componentType} uses no environment variables.
        </Typography>
      )}

      {editableEnvVars?.length > 0 && props.includeRadixVars && (
        <Typography className="env-var-radix-logo">
          (<HomeIcon /> automatically added by Radix )
        </Typography>
      )}

      {editableEnvVars?.length > 0 && (
        <form className="env-vars-list">
          {saveState.status === RequestState.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change environment variable. {saveState.error}
            </Alert>
          )}

          <div className="env-vars-table grid grid--table-overflow">
            <Table>
              <Table.Head className="env-vars-table-header">
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>Value</Table.Cell>
                  <Table.Cell>Original</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {editableEnvVars.map((editableEnvVar, i) => {
                  if (
                    editableEnvVar.origEnvVar.isRadixVariable &&
                    !props.includeRadixVars
                  ) {
                    return null;
                  }

                  const envVar = editableEnvVar.origEnvVar;
                  return envVar.isRadixVariable ? (
                    <Table.Row key={envVar.name}>
                      <Table.Cell className="env-var-name env-var-radix-logo">
                        <HomeIcon /> {envVar.name}
                      </Table.Cell>
                      <Table.Cell className="env-var-value">
                        <Typography>{envVar.value}</Typography>
                      </Table.Cell>
                      <Table.Cell className="env-var-value" />
                    </Table.Row>
                  ) : (
                    <Table.Row key={envVar.name}>
                      <Table.Cell className="env-var-name">
                        {envVar.name}
                      </Table.Cell>
                      <Table.Cell className="env-var-value">
                        {!inEditMode ? (
                          <Typography>{editableEnvVar.currentValue}</Typography>
                        ) : (
                          <div className="form-field">
                            <TextField
                              id={'envVar' + envVar.name}
                              disabled={
                                !inEditMode ||
                                saveState.status === RequestState.IN_PROGRESS
                              }
                              type="text"
                              value={editableEnvVar.currentValue}
                              onChange={(ev) =>
                                setEditableEnvVars(() => {
                                  editableEnvVars[i].currentValue =
                                    ev.target.value;
                                  return [...editableEnvVars];
                                })
                              }
                              multiline
                            />
                          </div>
                        )}
                      </Table.Cell>
                      <Table.Cell className="env-var-value">
                        {envVar.metadata?.radixConfigValue?.length > 0 && (
                          <Typography>
                            {envVar.metadata.radixConfigValue}
                          </Typography>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>

            {saveState.status === RequestState.IN_PROGRESS && (
              <>
                <CircularProgress size={24} /> Updating…
              </>
            )}
          </div>
        </form>
      )}
    </>
  );
};
