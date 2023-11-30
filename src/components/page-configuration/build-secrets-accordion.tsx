import { Accordion, List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, ReactNode, useState } from 'react';

import { useGetBuildSecrets } from './use-get-build-secrets';
import { useSaveBuildSecrets } from './use-save-build-secret';

import AsyncResource from '../async-resource/simple-async-resource';
import { ScrimPopup } from '../scrim-popup';
import { SecretForm } from '../secret-form';
import { BuildSecretStatusBadge } from '../status-badges/build-secret-status-badge';
import { BuildSecretModel } from '../../models/radix-api/buildsecrets/build-secret';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

import './style.css';

const BuildSecretForm: FunctionComponent<{
  appName: string;
  buildSecret: BuildSecretModel;
  pollSecret: () => void;
}> = ({ appName, buildSecret, pollSecret }) => {
  const [saveState, saveSecretFunc, resetSaveState] = useSaveBuildSecrets(
    appName,
    buildSecret.name
  );

  return (
    <SecretForm
      secret={buildSecret}
      secretName={buildSecret.name}
      saveState={saveState.status}
      saveError={saveState.error}
      getSecret={pollSecret}
      resetSaveState={resetSaveState}
      handleSubmit={saveSecretFunc}
    />
  );
};

const SecretLink: FunctionComponent<{
  title: string;
  scrimTitle?: ReactNode;
  appName: string;
  buildSecret: BuildSecretModel;
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
          <BuildSecretForm {...rest} />
        </div>
      </ScrimPopup>
    </div>
  );
};

export const BuildSecretsAccordion: FunctionComponent<{ appName: string }> = ({
  appName,
}) => {
  const [buildSecretsState, pollBuildSecrets] = useGetBuildSecrets(appName);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Build secrets</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={buildSecretsState}>
            {buildSecretsState.data?.length > 0 ? (
              <List className="o-indent-list">
                {dataSorter(buildSecretsState.data, [
                  (a, b) => sortCompareString(a.name, b.name),
                ]).map((buildSecret) => (
                  <List.Item key={buildSecret.name}>
                    <div className="grid grid--gap-large grid--auto-columns">
                      <SecretLink
                        title={buildSecret.name}
                        appName={appName}
                        buildSecret={buildSecret}
                        pollSecret={pollBuildSecrets}
                      />

                      <BuildSecretStatusBadge status={buildSecret.status} />
                    </div>
                  </List.Item>
                ))}
              </List>
            ) : (
              <Typography>This app has no build secrets</Typography>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

BuildSecretsAccordion.propTypes = {
  appName: PropTypes.string.isRequired,
};
