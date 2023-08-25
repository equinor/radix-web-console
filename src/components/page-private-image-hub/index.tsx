import { FunctionComponent } from 'react';

import { useGetImageHubs } from './use-get-image-hubs';
import { useSaveImageHub } from './use-save-image-hub';

import AsyncResource from '../async-resource/simple-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { SecretForm } from '../secret-form';
import { routes } from '../../routes';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { routeWithParams } from '../../utils/string';
import { Typography } from '@equinor/eds-core-react';

export const PrivateImageHub: FunctionComponent<{
  appName: string;
  imageHubName: string;
}> = ({ appName, imageHubName }) => {
  const [imageHubState, pollImageHubs] = useGetImageHubs(appName);
  const [saveState, saveNewSecretFunc, resetSaveState] = useSaveImageHub(
    appName,
    imageHubName
  );

  const imageHub = imageHubState.data?.find((x) => x.server === imageHubName);

  return (
    <main className="grid grid--gap-medium">
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

      <AsyncResource asyncState={imageHubState}>
        <SecretForm
          saveState={saveState.status}
          saveError={saveState.error}
          secret={imageHub}
          secretName={imageHubName}
          resetSaveState={resetSaveState}
          getSecret={pollImageHubs}
          overview={
            imageHub && (
              <div>
                <Typography>
                  Server <strong>{imageHub.server}</strong>
                </Typography>
                <Typography>
                  Username <strong>{imageHub.username}</strong>
                </Typography>
              </div>
            )
          }
          handleSubmit={saveNewSecretFunc}
        />
      </AsyncResource>
    </main>
  );
};

const Component = connectRouteParams(PrivateImageHub);
export { Component, routeParamLoader as loader };
