import { Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash';
import AsyncSelect from 'react-select/async';
import * as PropTypes from 'prop-types';
import { useServiceNowApi } from '../../effects/use-servicenow-api';
import { ServiceNowApplication } from '../../models/servicenow';
import { useEffect, useState } from 'react';
import './style.css';
import Alert from '../alert';
import { AxiosError } from 'axios';
import { StylesConfig } from 'react-select';
import { tokens } from '@equinor/eds-tokens';
import { ServiceNowApi } from '../../api/service-now-api';

export type OnConfigurationItemChangeCallback = (
  ci?: ServiceNowApplication
) => void;

export interface AppConfigConfigurationItemProps {
  configurationItemChangeCallback: OnConfigurationItemChangeCallback;
  disabled?: boolean;
  configurationItem?: string;
}

const loadOptions = debounce<
  (
    callback: (options: Array<ServiceNowApplication>) => void,
    errorCallback: (e: Error) => void,
    api: ServiceNowApi,
    value: string
  ) => void
>(
  (callback, errorCallback, ...rest) =>
    filterOptions(...rest)
      .then((v) => {
        callback(v);
        errorCallback(null);
      })
      .catch(errorCallback),
  500
);

async function filterOptions(
  api: ServiceNowApi,
  inputValue: string
): Promise<Array<ServiceNowApplication>> {
  return await api.getApplications(inputValue);
}

export const AppConfigConfigurationItem = ({
  configurationItem,
  configurationItemChangeCallback,
  disabled,
}: AppConfigConfigurationItemProps): JSX.Element => {
  const serviceNowApi = useServiceNowApi();
  const [currentCI, setCurrentCI] = useState<ServiceNowApplication>();
  const [apiError, setApiError] = useState<Error>();
  const [currentCINotFound, setCurrentCINotFound] = useState(false);

  useEffect(() => {
    setApiError(null);
    setCurrentCINotFound(false);

    if (!configurationItem) {
      setCurrentCI(null);
    } else {
      serviceNowApi
        .getApplication(configurationItem)
        .then((a) => setCurrentCI(a))
        .catch((e) => {
          if (e instanceof AxiosError && e.response?.status === 404) {
            setCurrentCINotFound(true);
            setCurrentCI({
              id: configurationItem,
              name: `${configurationItem} not found`,
            });
          } else {
            setApiError(e);
          }
        });
    }
  }, [configurationItem, serviceNowApi]);

  const onChange = (ci?: ServiceNowApplication) => {
    configurationItemChangeCallback(ci);
    setCurrentCI(ci);
  };

  const selectStyle: StylesConfig = {
    singleValue: (provided) => ({
      ...provided,
      backgroundColor: currentCINotFound
        ? tokens.colors.interactive.danger__highlight.hex
        : '',
      color: currentCINotFound
        ? tokens.colors.interactive.danger__text.hex
        : 'currentColor',
    }),
  };

  return (
    <div className="configuration-item-select">
      <Typography className="label" group="input" variant="text">
        Configuration item
      </Typography>
      <AsyncSelect
        styles={selectStyle}
        name="ConfigurationItem"
        menuPosition="fixed"
        closeMenuOnScroll={(e: Event) => {
          const target = e.target as HTMLInputElement;
          return target && !target.parentElement.className.match(/menu/);
        }}
        noOptionsMessage={() => null}
        loadOptions={(inputValue, callback) => {
          inputValue?.length < 3
            ? callback([])
            : loadOptions(callback, setApiError, serviceNowApi, inputValue);
        }}
        onChange={onChange}
        getOptionLabel={(ci: ServiceNowApplication) => ci.name}
        getOptionValue={(ci: ServiceNowApplication) => ci.id}
        isClearable
        closeMenuOnSelect={false}
        value={currentCI}
        isDisabled={disabled}
      />
      <Typography className="helpertext" group="input" variant="text">
        Application from IT Software Inventory (type 3 characters to search)
      </Typography>
      {apiError && (
        <div>
          <Alert type="danger">
            <Typography>Failed to load. {apiError.message}</Typography>
          </Alert>
        </div>
      )}
    </div>
  );
};

AppConfigConfigurationItem.propTypes = {
  configurationItem: PropTypes.string,
} as PropTypes.ValidationMap<AppConfigConfigurationItemProps>;
