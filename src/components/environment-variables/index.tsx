import {
  Accordion,
  Button,
  CircularProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { edit, restore_page, save } from '@equinor/eds-icons';
import { isNil, isString } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

import {
  EnvironmentVariableTable,
  type FormattedEnvVar,
} from './environment-variable-table';

import {
  type Component,
  type EnvVar,
  radixApi,
  useEnvVarsQuery,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils/parse-errors';
import AsyncResource from '../async-resource/async-resource';
import { errorToast } from '../global-top-nav/styled-toaster';
import { HomeIcon } from '../home-icon';

import './style.css';

const envVarsPollInterval = 8000;

function hasModifiedValue(values: Array<FormattedEnvVar>): boolean {
  return (
    values?.findIndex(
      ({ original: { metadata, value } }) =>
        !isNil(metadata?.radixConfigValue) &&
        value !== metadata.radixConfigValue
    ) !== -1
  );
}

function isRadixVariable({ name }: EnvVar): boolean {
  return isString(name) && !!name.match('(RADIX|RADIXOPERATOR)_*');
}

type Props = {
  appName: string;
  envName: string;
  componentName: string;
  componentType: Component['type'];
  hideRadixVars?: boolean;
  readonly?: boolean;
  isExpanded?: boolean;
  onExpanded?: (isExpanded: boolean) => void;
};
export const EnvironmentVariables = ({
  appName,
  envName,
  componentName,
  componentType,
  hideRadixVars,
  readonly,
  isExpanded,
  onExpanded,
}: Props) => {
  const [componentVars, setComponentVars] = useState<FormattedEnvVar[]>([]);
  const [radixVars, setRadixVars] = useState<FormattedEnvVar[]>([]);
  const [inEditMode, setInEditMode] = useState(false);

  const [pollVarsInterval, setPollVarsInterval] = useState(envVarsPollInterval);
  const {
    data: envVarsData,
    refetch: refetchEnvVars,
    ...envVarsState
  } = useEnvVarsQuery(
    { appName, envName, componentName },
    {
      skip: !appName || !envName || !componentName || !isExpanded,
      pollingInterval: pollVarsInterval,
    }
  );

  const [saveFunc, saveState] = radixApi.endpoints.changeEnvVar.useMutation();

  useEffect(() => {
    if (inEditMode) return;

    const categorizedVars = (envVarsData || [])
      .map((x) => ({ value: x.value, original: x }))
      .reduce<{ component: FormattedEnvVar[]; radix: FormattedEnvVar[] }>(
        (obj, x) => {
          (isRadixVariable(x.original) ? obj.radix : obj.component).push(x);
          return obj;
        },
        { component: [], radix: [] }
      );

    setRadixVars(!hideRadixVars ? categorizedVars.radix : []);
    setComponentVars(categorizedVars.component);
  }, [hideRadixVars, inEditMode, envVarsData]);

  const handleSetEditMode = useCallback<() => void>(() => {
    setPollVarsInterval(0);
    setInEditMode(true);
  }, []);

  const handleReset = useCallback<() => void>(() => {
    setInEditMode(false);
    setPollVarsInterval(envVarsPollInterval);
  }, []);

  async function handleSave(): Promise<void> {
    if (readonly) return;

    const body = componentVars
      .filter((x) => x.value != undefined && x.value !== x.original.value)
      .map((x) => ({ name: x.original.name, value: x.value! }));
    if (body.length > 0) {
      try {
        await saveFunc({ appName, envName, componentName, body }).unwrap();
        refetchEnvVars();
      } catch (error) {
        errorToast(`Failed to save variables. ${getFetchErrorMessage(error)}`);
      }
    }
    setInEditMode(false);
    setPollVarsInterval(envVarsPollInterval);
  }

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isExpanded} onExpandedChange={onExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Environment variables
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={envVarsState}>
            <div className="grid grid--gap-x-large">
              {componentVars.length > 0 ? (
                <div className="grid grid--gap-small">
                  <div className="env-vars-form__title">
                    <Typography className="whitespace-nowrap" as="span" bold>
                      Component variables
                    </Typography>
                    {!readonly && !saveState.isLoading && inEditMode ? (
                      <div className="grid grid--gap-small grid--auto-columns">
                        <Button variant="contained" onClick={handleSave}>
                          <Icon data={save} /> Apply
                        </Button>
                        <Button variant="outlined" onClick={handleReset}>
                          <Icon data={restore_page} /> Cancel
                        </Button>
                      </div>
                    ) : (
                      !readonly && (
                        <div>
                          <Button onClick={handleSetEditMode}>
                            <Icon data={edit} /> Edit
                          </Button>
                        </div>
                      )
                    )}
                  </div>

                  {!readonly && inEditMode && (
                    <Typography>
                      {componentType === 'job'
                        ? 'Changes will be applied for new jobs'
                        : 'Component will have to be restarted to see the applied changes'}
                    </Typography>
                  )}

                  <form className="env-vars-form grid">
                    <EnvironmentVariableTable
                      values={componentVars}
                      showOriginal={hasModifiedValue(componentVars)}
                      isTextfieldDisabled={saveState.isLoading}
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

                    {saveState.isLoading && (
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
                      values={radixVars}
                      valuePrefix={<HomeIcon />}
                    />
                  </form>
                </div>
              )}
            </div>
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
