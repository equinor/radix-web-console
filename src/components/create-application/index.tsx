import {
  type ApplicationRegistration,
  radixApi,
  useGetDeployKeyAndSecretQuery,
  useRegisterApplicationMutation,
} from '../../store/radix-api';
import './style.css';
import { useState } from 'react';
import { pollingInterval } from '../../store/defaults';
import { CreateApplicationScrim } from './create-application-scrim';

export default function PageCreateApplication() {
  const [refreshApps] = radixApi.endpoints.showApplications.useLazyQuery({});
  const [createApp] = useRegisterApplicationMutation();
  const [appName, setAppName] = useState<string>();

  const { data: secrets } = useGetDeployKeyAndSecretQuery(
    { appName: appName! },
    { pollingInterval, skip: !appName }
  );

  const onCreateApplication = async (
    applicationRegistration: ApplicationRegistration,
    acknowledgeWarnings: boolean
  ) => {
    const response = await createApp({
      applicationRegistrationRequest: {
        applicationRegistration,
        acknowledgeWarnings,
      },
    }).unwrap();

    if (response.applicationRegistration) {
      setAppName(response.applicationRegistration.name);
    }

    return response.warnings ?? [];
  };

  return (
    <CreateApplicationScrim
      secrets={secrets}
      onCreateApplication={onCreateApplication}
      onRefreshApps={() => refreshApps({})}
    />
  );
}
