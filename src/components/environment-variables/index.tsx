import {
  Button,
  CircularProgress,
  Icon,
  Table,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { edit, restore_page, save } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { ChangeEvent, useEffect, useState } from 'react';

import { usePollEnvVars } from './use-poll-env-vars';
import { useSaveEnvVar } from './use-save-env-var';

import Alert from '../alert';
import { HomeIcon } from '../home-icon';
import { ComponentType } from '../../models/component-type';
import {
  EnvironmentVariableNormalizedModel,
  UpdatableEnvironmentVariableModel,
} from '../../models/environment-variable';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

export interface EnvironmentVariablesProps {
  appName: string;
  envName: string;
  componentName: string;
  componentType: ComponentType;
  hideRadixVars?: boolean;
  readonly?: boolean;
}

interface FormattedEnvVar {
  currentValue: string;
  origVar: EnvironmentVariableNormalizedModel;
}

function getUpdatedVars(
  list: Array<FormattedEnvVar>
): Array<UpdatableEnvironmentVariableModel> {
  return list
    ?.filter((x) => x.currentValue !== x.origVar.value)
    .map((x) => ({ name: x.origVar.name, value: x.currentValue }));
}

function formatEnvironmentVars(
  envVars: Array<EnvironmentVariableNormalizedModel>
): Array<FormattedEnvVar> {
  return envVars?.map((x) => ({ currentValue: x.value, origVar: x })) || [];
}

export const EnvironmentVariables = ({
  appName,
  envName,
  componentName,
  componentType,
  hideRadixVars,
  readonly,
}: EnvironmentVariablesProps): JSX.Element => {
  const [componentVars, setComponentVars] = useState<FormattedEnvVar[]>([]);
  const [radixVars, setRadixVars] = useState<FormattedEnvVar[]>([]);
  const [inEditMode, setInEditMode] = useState(false);

  const [saveState, saveFunc, resetState] = useSaveEnvVar(
    appName,
    envName,
    componentName
  );
  const [pollingPauseState, setPollingPauseState] = useState(false);
  const [pollEnvVarsState] = usePollEnvVars(
    appName,
    envName,
    componentName,
    pollingPauseState
  );

  const hasEditedValue = !!componentVars.find(
    ({ origVar }) =>
      !!origVar.metadata?.radixConfigValue &&
      origVar.value !== origVar.metadata.radixConfigValue
  );

  useEffect(() => {
    if (inEditMode) return;

    const categorizedVars = formatEnvironmentVars(
      pollEnvVarsState.data
    ).reduce<{
      component: FormattedEnvVar[];
      radix: FormattedEnvVar[];
    }>(
      (obj, x) => {
        (!x.origVar.isRadixVariable ? obj.component : obj.radix).push(x);
        return obj;
      },
      { component: [], radix: [] }
    );

    setRadixVars(!hideRadixVars ? categorizedVars.radix : []);
    setComponentVars(categorizedVars.component);
  }, [hideRadixVars, inEditMode, pollEnvVarsState.data]);

  function handleSetEditMode(): void {
    setPollingPauseState(true);
    setInEditMode(true);
  }

  function handleSave(): void {
    if (readonly) return;

    const vars = getUpdatedVars(componentVars);
    if (vars?.length > 0) {
      saveFunc(vars);
    }
    setInEditMode(false);
    setPollingPauseState(false);
  }

  function handleReset(): void {
    resetState();
    setInEditMode(false);
    setPollingPauseState(false);
  }

  return (
    <>
      <div className="section__heading_with_buttons grid grid--gap-medium">
        <Typography variant="h4">Environment variables</Typography>
        {componentVars.length > 0 &&
          (!readonly &&
          (saveState.status === RequestState.IDLE ||
            saveState.status === RequestState.SUCCESS) &&
          inEditMode ? (
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
          ))}
      </div>

      {pollEnvVarsState.error && (
        <div>
          <Alert type="danger">
            Failed to get environment variables. {pollEnvVarsState.error}
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

      {componentVars.length > 0 ? (
        <>
          {!readonly && inEditMode && (
            <Typography>
              {componentType === ComponentType.job
                ? 'Changes will be applied for new jobs'
                : 'Component will have to be restarted to see the applied changes'}
            </Typography>
          )}

          <form className="env-vars-list">
            <div className="env-var-list-title">
              <Typography as="span" bold>
                Component variables
              </Typography>
            </div>
            {saveState.status === RequestState.FAILURE && (
              <Alert className="gap-bottom" type="danger">
                Failed to change environment variable. {saveState.error}
              </Alert>
            )}

            <div className="env-vars-table grid grid--table-overflow">
              <Table>
                <Table.Head className="env-vars-table-header">
                  <Table.Row>
                    <Table.Cell className="env-vars-table-header-name">
                      Name
                    </Table.Cell>
                    <Table.Cell>Value</Table.Cell>
                    {hasEditedValue && <Table.Cell>Original</Table.Cell>}
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
                                saveState.status === RequestState.IN_PROGRESS
                              }
                              onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                                setComponentVars(() => {
                                  componentVars[i].currentValue =
                                    ev.target.value;
                                  return [...componentVars];
                                });
                              }}
                            />
                          </div>
                        )}
                      </Table.Cell>
                      {hasEditedValue && (
                        <Table.Cell className="env-var-value">
                          {x.origVar.metadata?.radixConfigValue?.length > 0 && (
                            <Typography>
                              {x.origVar.metadata.radixConfigValue}
                            </Typography>
                          )}
                        </Table.Cell>
                      )}
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
        </>
      ) : (
        <Typography bold>
          This {componentType} uses no environment variables.
        </Typography>
      )}

      {radixVars.length > 0 && (
        <form className="env-vars-list env-vars-list-radix">
          <div className="env-var-list-title">
            <HomeIcon />
            <Typography as="span" bold>
              Radix variables
            </Typography>
          </div>
          <div className="env-vars-table grid grid--table-overflow">
            <Table>
              <Table.Head className="env-vars-table-header">
                <Table.Row>
                  <Table.Cell className="env-vars-table-header-name">
                    Name
                  </Table.Cell>
                  <Table.Cell>Value</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {radixVars.map(({ origVar }) => (
                  <Table.Row key={origVar.name}>
                    <Table.Cell className="env-var-name env-var-radix-logo">
                      <HomeIcon /> {origVar.name}
                    </Table.Cell>
                    <Table.Cell className="env-var-value">
                      <Typography>{origVar.value}</Typography>
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

EnvironmentVariables.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  componentType: PropTypes.oneOf(Object.values(ComponentType)).isRequired,
  hideRadixVars: PropTypes.bool,
  readonly: PropTypes.bool,
} as PropTypes.ValidationMap<EnvironmentVariablesProps>;
