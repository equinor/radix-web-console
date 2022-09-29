import { Typography } from '@equinor/eds-core-react';
import { debounce } from 'lodash';
import { ActionMeta } from 'react-select';
import AsyncSelect from 'react-select/async';
import { ServiceNowApi, ServiceNowApplication } from '../../api/baseapi';
import { ServiceNowAuthProvider, useAppContext } from '../app-context';
import * as PropTypes from 'prop-types';
import { configVariables } from '../../utils/config';
import { useEffect, useState } from 'react';

export interface AppConfigAdGroupsProps {
  appId?: string;
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
  return await api.getApplications();
}

const useServiceNowApi = () => {
  const { serviceNowAuthProvider } = useAppContext();

  const [api, setApi] = useState<ServiceNowApi>(
    new ServiceNowApi(
      configVariables.SERVICENOW_PROXY_BASEURL,
      serviceNowAuthProvider
    )
  );

  useEffect(() => {
    setApi(
      new ServiceNowApi(
        configVariables.SERVICENOW_PROXY_BASEURL,
        serviceNowAuthProvider
      )
    );
  }, [serviceNowAuthProvider]);

  return api;
};

const onChange = (
  value: ServiceNowApplication,
  actionMeta: ActionMeta<ServiceNowApplication>
) => {
  console.log(value);
  console.log(actionMeta);
};
export const AppConfigAppId = ({
  appId,
}: AppConfigAdGroupsProps): JSX.Element => {
  const serviceNowApi = useServiceNowApi();

  return (
    <>
      <Typography
        className="label"
        group="input"
        variant="text"
        token={{ color: 'currentColor' }}
      >
        ServiceNow Application (type 3 characters to search){' '}
      </Typography>
      <AsyncSelect
        name="ServiceNowApp"
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
        getOptionValue={(a: ServiceNowApplication) => a.sysId}
        isClearable
        closeMenuOnSelect={false}
      />
    </>
  );
};

AppConfigAppId.propTypes = {
  appId: PropTypes.string,
} as PropTypes.ValidationMap<AppConfigAdGroupsProps>;
