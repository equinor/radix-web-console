import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import { pollingInterval } from '../../../store/defaults';
import { radixApi, useGetEnvironmentQuery } from '../../../store/radix-api';
import { getFetchErrorMessage } from '../../../store/utils';
import AsyncResource from '../../async-resource/async-resource';
import { errorToast, successToast } from '../../global-top-nav/styled-toaster';
import { SecretForm } from '../../secret-form';

export const SecretOverview: FunctionComponent<{
  appName: string;
  componentName: string;
  envName: string;
  secretName: string;
  onSave?: () => void;
}> = ({ appName, componentName, envName, secretName, onSave }) => {
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
            onSave?.();
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
  onSave: PropTypes.func,
};
