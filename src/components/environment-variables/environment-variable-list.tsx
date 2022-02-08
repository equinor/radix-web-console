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

import { useSaveEnvVar } from './use-save-env-var';

import { Alert } from '../alert';
import { HomeIcon } from '../home-icon';
import { ComponentType } from '../../models/component-type';
import {
  EnvironmentVariableNormalizedModel,
  EnvironmentVariableNormalizedModelValidationMap,
  UpdatableEnvironmentVariableModel,
} from '../../models/environment-variable';
import { PollingStateModel } from '../../models/polling-state';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

export interface EnvironmentVariableListProps {
  appName: string;
  envName: string;
  componentName: string;
  componentType: ComponentType;
  envVars: Array<EnvironmentVariableNormalizedModel>;
  setPollingState: (props: PollingStateModel) => void;
  pollStateError?: string;
  hideRadixVars?: boolean;
  readonly?: boolean;
}

interface FormattedEnvVar {
  currentValue: string;
  origVar: EnvironmentVariableNormalizedModel;
}

const getUpdatedVars = (
  list: FormattedEnvVar[]
): UpdatableEnvironmentVariableModel[] =>
  list
    ?.filter((x) => x.currentValue !== x.origVar.value)
    .map((x) => ({ name: x.origVar.name, value: x.currentValue })) || [];

const formatEnvironmentVars = (
  envVars: EnvironmentVariableNormalizedModel[]
): FormattedEnvVar[] =>
  envVars?.map((envVar) => ({ currentValue: envVar.value, origVar: envVar })) ||
  [];

export const EnvironmentVariableList = (
  props: EnvironmentVariableListProps
): JSX.Element => {
  const [inEditMode, setInEditMode] = useState(false);
  const [saveState, saveFunc, resetState] = useSaveEnvVar(
    props.appName,
    props.envName,
    props.componentName
  );

  const [componentVars, setComponentVars] = useState<FormattedEnvVar[]>([]);
  const [radixVars, setRadixVars] = useState<FormattedEnvVar[]>([]);

  const hasEditedValue = !!componentVars.find(
    (x) =>
      !!x.origVar.metadata?.radixConfigValue &&
      x.origVar.value !== x.origVar.metadata.radixConfigValue
  );

  useEffect(() => {
    if (inEditMode) {
      return;
    }

    const categorizedVars = formatEnvironmentVars(props.envVars).reduce(
      (a: { component: FormattedEnvVar[]; radix: FormattedEnvVar[] }, b) => {
        b.origVar.isRadixVariable ? a.radix.push(b) : a.component.push(b);
        return a;
      },
      { component: [], radix: [] }
    );

    setComponentVars(categorizedVars.component);
    setRadixVars(!props.hideRadixVars ? categorizedVars.radix : []);
  }, [props.hideRadixVars, inEditMode, props.envVars]);

  const handleSetEditMode = (): void => {
    props.setPollingState({ paused: true });
    setInEditMode(true);
  };

  const handleSave = (): void => {
    if (props.readonly) {
      return;
    }

    const vars = getUpdatedVars(componentVars);
    if (vars.length > 0) {
      saveFunc(vars);
    }
    setInEditMode(false);
    props.setPollingState({ paused: false });
  };

  const handleReset = (): void => {
    resetState();
    setInEditMode(false);
    props.setPollingState({ paused: false });
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

      {props.pollStateError && (
        <div>
          <Alert type="danger">
            Failed to get environment variables. {props.pollStateError}
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
          {!props.readonly && inEditMode && (
            <Typography>
              {props.componentType === ComponentType.job
                ? 'Changes will be applied for new jobs'
                : 'Component will have to be restarted to see the applied changes'}
            </Typography>
          )}
        </>
      ) : (
        <Typography bold>
          This {props.componentType} uses no environment variables.
        </Typography>
      )}

      {componentVars.length > 0 && (
        <form className="env-vars-list">
          <div className="env-var-list-title">
            <Typography as="span" bold>
              Component variables
            </Typography>
          </div>
          {saveState.status === RequestState.FAILURE && (
            <Alert type="danger" className="gap-bottom">
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
                                componentVars[i].currentValue = ev.target.value;
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

EnvironmentVariableList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  componentType: PropTypes.oneOf(Object.keys(ComponentType)).isRequired,
  envVars: PropTypes.arrayOf(
    PropTypes.shape(EnvironmentVariableNormalizedModelValidationMap)
  ).isRequired,
  setPollingState: PropTypes.func.isRequired,
  pollStateError: PropTypes.string,
  hideRadixVars: PropTypes.bool,
  readonly: PropTypes.bool,
};
