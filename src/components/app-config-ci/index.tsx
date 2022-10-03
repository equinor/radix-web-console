import { Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash';
import AsyncSelect from 'react-select/async';
import { ServiceNowApi } from '../../api/baseapi';
import * as PropTypes from 'prop-types';
import { useServiceNowApi } from '../../effects/use-servicenow-api';
import { ServiceNowApplication } from '../../models/servicenow';
import { useEffect, useState } from 'react';

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
    api: ServiceNowApi,
    value: string
  ) => void
>((callback, ...rest) => filterOptions(...rest).then(callback), 500);

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
  const [defaultValue, setDefaultValue] = useState<ServiceNowApplication>();

  useEffect(() => {
    if (!configurationItem) {
      setDefaultValue(null);
    } else {
      serviceNowApi
        .getApplication(configurationItem)
        .then((a) => setDefaultValue(a))
        .catch((e) => console.error(e));
    }
  }, [configurationItem, serviceNowApi]);

  const onChange = (ci?: ServiceNowApplication) => {
    configurationItemChangeCallback(ci);
    setDefaultValue(ci);
  };

  return (
    <>
      <Typography
        className="label"
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        Configuration item (type 3 characters to search){' '}
      </Typography>
      <AsyncSelect
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
            : loadOptions(callback, serviceNowApi, inputValue);
        }}
        onChange={onChange}
        getOptionLabel={(a: ServiceNowApplication) => a.name}
        getOptionValue={(a: ServiceNowApplication) => a.id}
        isClearable
        closeMenuOnSelect={false}
        value={defaultValue}
        isDisabled={disabled}
      />
    </>
  );
};

AppConfigConfigurationItem.propTypes = {
  configurationItem: PropTypes.string,
} as PropTypes.ValidationMap<AppConfigConfigurationItemProps>;
