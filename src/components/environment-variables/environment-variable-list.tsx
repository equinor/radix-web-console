import {
  Button,
  CircularProgress,
  Icon,
  Table,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { edit, restore_page, save } from '@equinor/eds-icons';
import { ChangeEvent, useEffect, useState } from 'react';

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
  readonly?: boolean;
}

interface FormattedEnvVars {
  currentValue: string;
  origVar: EnvironmentVariableNormalizedModel;
}

const getUpdatedVars = (
  list: Array<FormattedEnvVars>
): EnvironmentVariableModel[] =>
  list?.map((x) => ({ name: x.origVar.name, value: x.currentValue })) || [];

const formatEnvVars = (
  envVars: EnvironmentVariableNormalizedModel[]
): FormattedEnvVars[] =>
  envVars?.map((envVar) => ({ currentValue: envVar.value, origVar: envVar })) ||
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

  const [componentVars, setComponentVars] = useState<FormattedEnvVars[]>([]);
  const [radixVars, setRadixVars] = useState<FormattedEnvVars[]>([]);

  useEffect(() => {
    if (inEditMode) {
      return;
    }

    const vars = formatEnvVars(props.envVars);
    setComponentVars(vars.filter((x) => !x.origVar.isRadixVariable));
    if (props.includeRadixVars) {
      setRadixVars(vars.filter((x) => x.origVar.isRadixVariable));
    }
  }, [props.includeRadixVars, inEditMode, props.envVars]);

  const handleSetEditMode = () => {
    props.setPoolingState({ paused: true });
    setInEditMode(true);
  };

  const handleSave = () => {
    if (props.readonly) {
      return;
    }

    const vars = getUpdatedVars(componentVars);
    if (vars.length > 0) {
      saveFunc(vars);
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
        {componentVars.length > 0 &&
          !props.readonly &&
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

      {componentVars.length === 0 ? (
        <Typography>
          This {props.componentType} uses no environment variables.
        </Typography>
      ) : (
        <>
          {!props.readonly && inEditMode && (
            <Typography>
              {props.componentType === ComponentType.job
                ? 'Applied changes will be used for new started jobs'
                : 'Component needs to be restarted after applied changes'}
            </Typography>
          )}
        </>
      )}

      {componentVars.length > 0 && (
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
                {componentVars.map((x, i) => (
                  <Table.Row key={x.origVar.name}>
                    <Table.Cell className="env-var-name">
                      {x.origVar.name}
                    </Table.Cell>
                    <Table.Cell className="env-var-value">
                      {!inEditMode ? (
                        <Typography>{x.currentValue}</Typography>
                      ) : (
                        <div className="form-field">
                          <TextField
                            id={'envVar' + x.origVar.name}
                            type="text"
                            value={x.currentValue}
                            multiline
                            disabled={
                              !inEditMode ||
                              saveState.status === RequestState.IN_PROGRESS
                            }
                            onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                              setComponentVars(() => {
                                componentVars[i].currentValue = ev.target.value;
                                return [...componentVars];
                              });
                            }}
                          />
                        </div>
                      )}
                    </Table.Cell>
                    <Table.Cell className="env-var-value">
                      {x.origVar.metadata?.radixConfigValue?.length > 0 && (
                        <Typography>
                          {x.origVar.metadata.radixConfigValue}
                        </Typography>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
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

      {radixVars.length > 0 && (
        <form className="env-vars-list">
          <Typography className="env-var-radix-logo">
            <HomeIcon /> automatically added by Radix
          </Typography>
          <div className="env-vars-table grid grid--table-overflow">
            <Table>
              <Table.Head className="env-vars-table-header">
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>Value</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {radixVars.map((x) => (
                  <Table.Row key={x.origVar.name}>
                    <Table.Cell className="env-var-name env-var-radix-logo">
                      <HomeIcon /> {x.origVar.name}
                    </Table.Cell>
                    <Table.Cell className="env-var-value">
                      <Typography>{x.origVar.value}</Typography>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </form>
      )}
    </>
  );
};
