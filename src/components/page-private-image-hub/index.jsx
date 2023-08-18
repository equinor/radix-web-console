import Overview from './overview';
import { useGetImageHubs } from './use-get-image-hubs';
import { useSaveImageHub } from './use-save-image-hub';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { SecretForm } from '../secret-form';
import { routes } from '../../routes';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { routeWithParams } from '../../utils/string';

export const PrivateImageHub = ({ appName, imageHubName }) => {
  const [getImageState, pollImageHubs] = useGetImageHubs(appName);
  const [saveState, saveNewSecretFunc, resetSaveState] = useSaveImageHub(
    appName,
    imageHubName
  );

  const imageHub = getImageState.data?.find(
    (hub) => hub.server === imageHubName
  );

  return (
    <>
      <DocumentTitle title={`Image hub ${imageHubName}`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Configuration',
            to: routeWithParams(routes.appConfig, { appName }),
          },
          { label: 'Private image hubs' },
          { label: imageHubName },
        ]}
      />
      <AsyncResource asyncState={getImageState}>
        <SecretForm
          saveState={saveState.status}
          saveError={saveState.error}
          secret={imageHub}
          resetSaveState={resetSaveState}
          getSecret={pollImageHubs}
          overview={
            imageHub && (
              <Overview server={imageHubName} username={imageHub.username} />
            )
          }
          handleSubmit={saveNewSecretFunc}
        />
      </AsyncResource>
    </>
  );
};

const Component = connectRouteParams(PrivateImageHub);
export { Component, routeParamLoader as loader };
