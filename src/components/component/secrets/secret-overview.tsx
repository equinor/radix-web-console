import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import AsyncResource from '../../async-resource/async-resource';
import { errorToast, successToast } from '../../global-top-nav/styled-toaster';
import { SecretForm } from '../../secret-form';
import { radixApi, useGetEnvironmentQuery } from '../../../store/radix-api';
import { pollingInterval } from '../../../store/defaults';
import { getFetchErrorMessage } from '../../../store/utils';

export const SecretOverview: FunctionComponent<{
  appName: string;
  componentName: string;
  envName: string;
  secretName: string;
}> = ({ appName, componentName, envName, secretName }) => {
  const { data, refetch, ...envState } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  );

  const [trigger, { isLoading }] =
    radixApi.endpoints.changeComponentSecret.useMutation();

  const secret =
    data?.activeDeployment &&
    data.secrets?.find(
      (x) => x.name === secretName && x.component === componentName
    );

  return (
    <AsyncResource asyncState={envState}>
      {data && secret ? (
        <SecretForm
          secret={secret}
          secretName={secret.name}
          disableForm={isLoading}
          disableSave={isLoading}
          onSave={async (value): Promise<boolean> => {
            try {
              await trigger({
                appName,
                envName,
                componentName,
                secretName,
                secretParameters: { secretValue: value?.toString() },
              }).unwrap();

              refetch();
              successToast('Saved');
            } catch (error) {
              errorToast(`Error while saving. ${getFetchErrorMessage(error)}`);
              return false;
            }

            return true;
          }}
        />
      ) : (
        <>No secret…</>
      )}
    </AsyncResource>
  );
};

SecretOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  secretName: PropTypes.string.isRequired,
};
