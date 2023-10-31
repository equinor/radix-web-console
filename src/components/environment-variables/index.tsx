import {
  Accordion,
  Button,
  CircularProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { edit, restore_page, save } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';

import {
  EnvironmentVariableTable,
  FormattedEnvVar,
} from './environment-variable-table';
import { usePollEnvVars } from './use-poll-env-vars';
import { useSaveEnvVar } from './use-save-env-var';

import { Alert } from '../alert';
import { HomeIcon } from '../home-icon';
import { ComponentType } from '../../models/radix-api/deployments/component-type';
import { UpdatableEnvVarModel } from '../../models/radix-api/environmentvariables/env-var';
import { RequestState } from '../../state/state-utils/request-states';
import { isNullOrUndefined } from '../../utils/object';

import './style.css';

export interface EnvironmentVariablesProps {
  appName: string;
  envName: string;
  componentName: string;
  componentType: ComponentType;
  hideRadixVars?: boolean;
  readonly?: boolean;
}

const envVarsPollInterval = 8000;

function hasModifiedValue(envVars: Array<FormattedEnvVar>): boolean {
  return (
    envVars?.findIndex(
      ({ original }) =>
        !isNullOrUndefined(original.metadata?.radixConfigValue) &&
        original.value !== original.metadata.radixConfigValue
    ) !== -1
  );
}

export const EnvironmentVariables: FunctionComponent<
  EnvironmentVariablesProps
> = ({
  appName,
  envName,
  componentName,
  componentType,
  hideRadixVars,
  readonly,
}) => {
  const [componentVars, setComponentVars] = useState<FormattedEnvVar[]>([]);
  const [radixVars, setRadixVars] = useState<FormattedEnvVar[]>([]);
  const [inEditMode, setInEditMode] = useState(false);

  const [pollVarsInterval, setPollVarsInterval] = useState(envVarsPollInterval);
  const [{ data: envVarsData, error: pollEnvVarsError }] = usePollEnvVars(
    appName,
    envName,
    componentName,
    pollVarsInterval
  );
  const [{ status: saveStatus, error: saveError }, saveFunc, resetState] =
    useSaveEnvVar(appName, envName, componentName);

  useEffect(() => {
    if (inEditMode) return;

    const categorizedVars = (envVarsData ?? [])
      .map((x) => ({ value: x.value, original: x }))
      .reduce<{ component: FormattedEnvVar[]; radix: FormattedEnvVar[] }>(
        (obj, x) => {
          (!x.original.isRadixVariable ? obj.component : obj.radix).push(x);
          return obj;
        },
        { component: [], radix: [] }
      );

    setRadixVars(!hideRadixVars ? categorizedVars.radix : []);
    setComponentVars(categorizedVars.component);
  }, [hideRadixVars, inEditMode, envVarsData]);

  const handleSetEditMode = useCallback<() => void>(() => {
    setPollVarsInterval(null);
    setInEditMode(true);
  }, []);

  const handleReset = useCallback<() => void>(() => {
    resetState();
    setInEditMode(false);
    setPollVarsInterval(envVarsPollInterval);
  }, [resetState]);

  function handleSave(): void {
    if (readonly) return;

    const vars = componentVars
      ?.filter((x) => x.value !== x.original.value)
      .map<UpdatableEnvVarModel>((x) => ({
        name: x.original.name,
        value: x.value,
      }));
    if (vars?.length > 0) {
      saveFunc(vars);
    }
    setInEditMode(false);
    setPollVarsInterval(envVarsPollInterval);
  }

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Environment variables
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          {pollEnvVarsError && (
            <Alert type="danger">
              Failed to get environment variables. {pollEnvVarsError}
            </Alert>
          )}

          {saveError && (
            <Alert type="danger">
              Failed to save environment variables. {saveError}
            </Alert>
          )}

          <div className="grid grid--gap-x-large">
            {componentVars.length > 0 ? (
              <div className="grid grid--gap-small">
                <div className="env-vars-form__title">
                  <Typography className="whitespace-nowrap" as="span" bold>
                    Component variables
                  </Typography>
                  {!readonly &&
                  (saveStatus === RequestState.IDLE ||
                    saveStatus === RequestState.SUCCESS) &&
                  inEditMode ? (
                    <div className="grid grid--gap-small grid--auto-columns">
                      <Button variant="contained" onClick={handleSave}>
                        <Icon data={save} /> Apply
                      </Button>
                      <Button variant="outlined" onClick={handleReset}>
                        <Icon data={restore_page} /> Cancel
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button onClick={handleSetEditMode}>
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

                {saveStatus === RequestState.FAILURE && (
                  <Alert type="danger">
                    Failed to change environment variable. {saveError}
                  </Alert>
                )}

                <form className="env-vars-form grid">
                  <EnvironmentVariableTable
                    vars={componentVars}
                    showOriginal={hasModifiedValue(componentVars)}
                    isTextfieldDisabled={
                      saveStatus === RequestState.IN_PROGRESS
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

                  {saveStatus === RequestState.IN_PROGRESS && (
                    <>
                      <CircularProgress size={24} /> Updating…
                    </>
                  )}
                </form>
              </div>
            ) : (
              <Typography bold>
                This {componentType} uses no environment variables.
              </Typography>
            )}

            {radixVars.length > 0 && (
              <div className="grid grid--gap-small">
                <div className="env-vars-form__title">
                  <span>
                    <HomeIcon />
                    <Typography className="whitespace-nowrap" as="span" bold>
                      Radix variables
                    </Typography>
                  </span>
                </div>

                <form className="env-vars-form grid">
                  <EnvironmentVariableTable
                    vars={radixVars}
                    varPrefix={<HomeIcon />}
                  />
                </form>
              </div>
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
};
