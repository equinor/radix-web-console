import { pollingInterval } from '../../../store/defaults';
import { radixApi, useGetEnvironmentQuery } from '../../../store/radix-api';
import { getFetchErrorMessage } from '../../../store/utils';
import AsyncResource from '../../async-resource/async-resource';
import { errorToast, successToast } from '../../global-top-nav/styled-toaster';
import { SecretForm } from '../../secret-form';

type Props = {
  appName: string;
  componentName: string;
  envName: string;
  secretName: string;
  onSave?: () => void;
};
export const SecretOverview = ({
  appName,
  componentName,
  envName,
  secretName,
  onSave,
}: Props) => {
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
