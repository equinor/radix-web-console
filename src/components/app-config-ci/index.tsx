import { Typography } from '@equinor/eds-core-react';
import { AxiosError } from 'axios';
import { debounce } from 'lodash';
import * as PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { MultiValue, SingleValue, StylesConfig } from 'react-select';

import { ConfigurationItemPopover } from './ci-popover';
import { ConfigurationItemSelect } from './ci-select';

import { Alert } from '../alert';
import { ServiceNowApi } from '../../api/service-now-api';
import { useServiceNowApi } from '../../api/use-servicenow-api';
import { ApplicationModel } from '../../models/servicenow-api/models/service-now-application';

import './style.css';

export type OnConfigurationItemChangeCallback = (ci?: ApplicationModel) => void;

export interface AppConfigConfigurationItemProps {
  configurationItemChangeCallback: OnConfigurationItemChangeCallback;
  disabled?: boolean;
  configurationItem?: string;
}

const loadOptions = debounce<
  (
    callback: (options: Array<ApplicationModel>) => void,
    errorCallback: (err: Error) => void,
    api: ServiceNowApi,
    name: string
  ) => void
>(
  (callback, errorCallback, ...rest) =>
    filterOptions(...rest)
      .then((value) => {
        callback(value);
        errorCallback(null);
      })
      .catch(errorCallback),
  500
);

async function filterOptions(
  api: ServiceNowApi,
  inputValue: string
): Promise<Array<ApplicationModel>> {
  return await api.getApplications(inputValue);
}

export const AppConfigConfigurationItem = ({
  configurationItem,
  configurationItemChangeCallback,
  disabled,
}: AppConfigConfigurationItemProps): JSX.Element => {
  const [apiError, setApiError] = useState<Error>();
  const [currentCI, setCurrentCI] = useState<ApplicationModel>();
  const [popoverCI, setPopoverCI] = useState<ApplicationModel>();
  const [currentCINotFound, setCurrentCINotFound] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const serviceNowApi = useServiceNowApi();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleBodyClick = () => setPopoverOpen(false);
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  useEffect(() => {
    setApiError(null);
    setCurrentCINotFound(false);

    if (!configurationItem) {
      setCurrentCI(null);
    } else {
      serviceNowApi
        .getApplication(configurationItem)
        .then((ci) => setCurrentCI(ci))
        .catch((err: Error) => {
          if (err instanceof AxiosError && err.response?.status === 404) {
            setCurrentCINotFound(true);
            setCurrentCI({
              id: configurationItem,
              name: `${configurationItem} not found`,
            });
          } else {
            setApiError(err);
          }
        });
    }
  }, [configurationItem, serviceNowApi]);

  function onChange(newValue?: ApplicationModel): void {
    configurationItemChangeCallback(newValue);
    setCurrentCI(newValue);
    setPopoverOpen(false);
  }

  const selectStyle: StylesConfig = {
    singleValue: (provided) => ({
      ...provided,
      ...(currentCINotFound && {
        backgroundColor: 'var(--eds_interactive_danger__highlight)',
        color: 'var(--eds_interactive_danger__text)',
      }),
    }),
  };

  return (
    <div className="configuration-item-select">
      <Typography className="label" group="input" variant="text">
        Configuration item
      </Typography>
      <ConfigurationItemSelect<ApplicationModel>
        onInfoIconClick={(ev, ci) => {
          ev.stopPropagation();
          setPopoverCI(
            Array.isArray(ci)
              ? (ci as MultiValue<ApplicationModel>)[0]
              : (ci as SingleValue<ApplicationModel>)
          );
          setPopoverOpen(!popoverOpen);
        }}
        containerRef={containerRef}
        styles={selectStyle}
        name="ConfigurationItem"
        menuPosition="fixed"
        closeMenuOnScroll={({ target }: Event) =>
          !(target as HTMLElement)?.parentElement?.className?.match(/menu/)
        }
        noOptionsMessage={() => null}
        loadOptions={(inputValue, callback) => {
          inputValue?.length < 3
            ? callback([])
            : loadOptions(callback, setApiError, serviceNowApi, inputValue);
        }}
        onChange={onChange}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ id }) => id}
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

      {popoverCI && (
        <ConfigurationItemPopover
          anchorEl={containerRef.current}
          open={popoverOpen}
          configurationItem={popoverCI}
        />
      )}
    </div>
  );
};

AppConfigConfigurationItem.propTypes = {
  configurationItemChangeCallback: PropTypes.func.isRequired,
  configurationItem: PropTypes.string,
  disabled: PropTypes.bool,
} as PropTypes.ValidationMap<AppConfigConfigurationItemProps>;
