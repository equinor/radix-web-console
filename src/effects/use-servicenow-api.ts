import { useEffect, useState } from 'react';
import { ServiceNowApi } from '../api/service-now-api';
import { useAppContext } from '../components/app-context';
import { configVariables } from '../utils/config';

export const useServiceNowApi = () => {
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
