import {
  Accordion,
  Button,
  CircularProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { edit, restore_page, save } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import {
  EnvironmentVariableTable,
  FormattedEnvVar,
} from './environment-variable-table';
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

function getUpdatedVars(
  list: Array<FormattedEnvVar>
): Array<UpdatableEnvironmentVariableModel> {
  return list
    ?.filter((x) => x.value !== x.original.value)
    .map((x) => ({ name: x.original.name, value: x.value }));
}

function formatEnvironmentVars(
  variables: Array<EnvironmentVariableNormalizedModel>
): Array<FormattedEnvVar> {
  return variables?.map((x) => ({ value: x.value, original: x })) || [];
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
    ({ original }) =>
      !!original.metadata?.radixConfigValue &&
      original.value !== original.metadata.radixConfigValue
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
        (!x.original.isRadixVariable ? obj.component : obj.radix).push(x);
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
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Typography className="env-vars_title-nowrap" variant="h4">
            Environment variables
          </Typography>
        </Accordion.Header>
        <Accordion.Panel>
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

          <div className="grid grid--gap-x-large">
            {componentVars.length > 0 ? (
              <>
                <form className="env-vars-form grid grid--gap-small">
                  <div className="env-vars-form__title">
                    <Typography
                      className="env-vars_title-nowrap"
                      as="span"
                      bold
                    >
                      Component variables
                    </Typography>
                    {!readonly &&
                    (saveState.status === RequestState.IDLE ||
                      saveState.status === RequestState.SUCCESS) &&
                    inEditMode ? (
                      <div className="grid grid--gap-small grid--auto-columns">
                        <Button
                          variant="contained"
                          onClick={() => handleSave()}
                        >
                          <Icon data={save} /> Apply
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleReset()}
                        >
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
                  </div>

                  {!readonly && inEditMode && (
                    <Typography>
                      {componentType === ComponentType.job
                        ? 'Changes will be applied for new jobs'
                        : 'Component will have to be restarted to see the applied changes'}
                    </Typography>
                  )}

                  {saveState.status === RequestState.FAILURE && (
                    <Alert type="danger">
                      Failed to change environment variable. {saveState.error}
                    </Alert>
                  )}

                  <div className="grid">
                    <EnvironmentVariableTable
                      vars={componentVars}
                      showOriginal={hasEditedValue}
                      isTextfieldDisabled={
                        saveState.status === RequestState.IN_PROGRESS
                      }
                      inEditMode={inEditMode}
                      onValueChange={(value, name) => {
                        const obj = componentVars.find(
                          (x) => x.original.name === name
                        );
                        if (obj && obj.value !== value) {
                          obj.value = value;
                          setComponentVars([...componentVars]);
                        }
                      }}
                    />

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
              <form className="env-vars-form grid grid--gap-small">
                <div className="env-vars-form__title">
                  <span>
                    <HomeIcon />
                    <Typography
                      className="env-vars_title-nowrap"
                      as="span"
                      bold
                    >
                      Radix variables
                    </Typography>
                  </span>
                </div>
                <div className="grid">
                  <EnvironmentVariableTable
                    vars={radixVars}
                    varPrefix={<HomeIcon />}
                  />
                </div>
              </form>
            )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
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
