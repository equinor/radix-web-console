import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, ReactNode, useState } from 'react';

import { useGetImageHubs } from './use-get-image-hubs';
import { useSaveImageHub } from './use-save-image-hub';

import AsyncResource from '../async-resource/simple-async-resource';
import { ScrimPopup } from '../scrim-popup';
import { SecretForm } from '../secret-form';
import { ImageHubSecretStatusBadge } from '../status-badges/image-hub-secret-status-badge';
import { ImageHubSecretModel } from '../../models/radix-api/privateimagehubs/image-hub-secret';
import { sortCompareString } from '../../utils/sort-utils';

import './style.css';

const ImageHubForm: FunctionComponent<{
  appName: string;
  imageHub: ImageHubSecretModel;
  pollSecret: () => void;
}> = ({ appName, imageHub, pollSecret }) => {
  const [saveState, saveNewSecretFunc, resetSaveState] = useSaveImageHub(
    appName,
    imageHub.server
  );

  return (
    <SecretForm
      secret={imageHub}
      secretName={imageHub.server}
      saveState={saveState.status}
      saveError={saveState.error}
      overview={
        <div>
          <Typography>
            Server <strong>{imageHub.server}</strong>
          </Typography>
          <Typography>
            Username <strong>{imageHub.username}</strong>
          </Typography>
        </div>
      }
      getSecret={pollSecret}
      resetSaveState={resetSaveState}
      handleSubmit={saveNewSecretFunc}
    />
  );
};

const SecretLink: FunctionComponent<{
  title: string;
  scrimTitle?: ReactNode;
  appName: string;
  imageHub: ImageHubSecretModel;
  pollSecret: () => void;
}> = ({ title, scrimTitle, ...rest }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);

  return (
    <div>
      <Typography
        link
        onClick={() => setVisibleScrim(!visibleScrim)}
        token={{ textDecoration: 'none' }}
      >
        {title}
      </Typography>

      <ScrimPopup
        className="image-hub__scrim"
        title={scrimTitle || title}
        open={visibleScrim}
        isDismissable
        onClose={() => setVisibleScrim(false)}
      >
        <div className="image-hub__scrim-content">
          <ImageHubForm {...rest} />
        </div>
      </ScrimPopup>
    </div>
  );
};

export const ImageHubsAccordion: FunctionComponent<{ appName: string }> = ({
  appName,
}) => {
  const [imageHubState, pollImageHubs] = useGetImageHubs(appName);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Private image hubs</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={imageHubState}>
            {imageHubState.data?.length > 0 ? (
              <List className="o-indent-list">
                {imageHubState.data
                  .sort((a, b) => sortCompareString(a.server, b.server))
                  .map((imageHub) => (
                    <List.Item key={imageHub.server}>
                      <div className="grid grid--gap-large grid--auto-columns">
                        <SecretLink
                          title={imageHub.server}
                          scrimTitle={`${imageHub.server}: password`}
                          appName={appName}
                          imageHub={imageHub}
                          pollSecret={pollImageHubs}
                        />

                        <ImageHubSecretStatusBadge status={imageHub.status} />
                      </div>
                    </List.Item>
                  ))}
              </List>
            ) : (
              <Typography>This app has no private image hubs</Typography>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ImageHubsAccordion.propTypes = {
  appName: PropTypes.string.isRequired,
};
