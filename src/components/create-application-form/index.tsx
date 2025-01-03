import {
  Button,
  Checkbox,
  CircularProgress,
  Icon,
  List,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { type ChangeEvent, type FormEvent, useState } from 'react';

import useLocalStorage from '../../effects/use-local-storage';
import { externalUrls } from '../../externalUrls';
import {
  type ApplicationRegistration,
  type ApplicationRegistrationUpsertResponse,
  radixApi,
  useRegisterApplicationMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { Alert } from '../alert';
import { AppConfigAdGroups } from '../app-config-ad-groups';
import {
  AppConfigConfigurationItem,
  type OnConfigurationItemChangeCallback,
} from '../app-config-ci';
import {
  errorToast,
  successToast,
  warningToast,
} from '../global-top-nav/styled-toaster';
import type { HandleAdGroupsChangeCB } from '../graph/adGroups';
import { ExternalLink } from '../link/external-link';

function sanitizeName(name: string): string {
  // force name to lowercase, no spaces
  return name?.toLowerCase().replace(/[^a-z0-9]/g, '-') ?? '';
}

type Props = {
  onCreated: (application: ApplicationRegistration) => void;
};
export default function CreateApplicationForm({ onCreated }: Props) {
  const [acknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [createApp, creationState] = useRegisterApplicationMutation();
  const [applicationRegistration, setAppRegistration] =
    useState<ApplicationRegistration>({
      name: '',
      repository: '',
      sharedSecret: '',
      adGroups: [],
      owner: '',
      creator: '',
      wbs: '',
      configBranch: '',
      radixConfigFullName: 'radixconfig.yaml',
      configurationItem: '',
      readerAdGroups: [],
      adUsers: [],
      readerAdUsers: [],
    });

  const [refreshApps] = radixApi.endpoints.showApplications.useLazyQuery({});

  const [knownAppNames, setKnownAppNames] = useLocalStorage<Array<string>>(
    'knownApplications',
    []
  );

  const handleAdGroupsChange: HandleAdGroupsChangeCB = (value) => {
    setAppRegistration((current) => ({
      ...current,
      adGroups: value.filter((x) => x.type === 'Group').map((x) => x.id),
      adUsers: value.filter((x) => x.type !== 'Group').map((x) => x.id),
    }));
  };

  const handleConfigurationItemChange: OnConfigurationItemChangeCallback = (
    value
  ) => {
    setAppRegistration((current) => ({
      ...current,
      configurationItem: value?.id,
    }));
  };

  const handleAppRegistrationChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    const key = name as keyof ApplicationRegistration;
    if (key === 'name') value = sanitizeName(value);

    setAppRegistration((current) => ({ ...current, [key]: value }));
  };

  const addAppNameToLocalStorage = (appName: string) => {
    if (knownAppNames.some((knownAppName) => knownAppName === appName)) {
      return;
    }
    setKnownAppNames([...knownAppNames, appName].sort());
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      const response: ApplicationRegistrationUpsertResponse = await createApp({
        applicationRegistrationRequest: {
          applicationRegistration,
          acknowledgeWarnings,
        },
      }).unwrap();

      // the response will only contains an application if there are no warnings
      //Only call onCreated when created without warnings, or created with ack warnings
      if (response.applicationRegistration) {
        onCreated(response.applicationRegistration);
        addAppNameToLocalStorage(response.applicationRegistration.name);
        refreshApps({});
        successToast('Saved');
      } else {
        warningToast('Registration had warnings');
      }
    } catch (e) {
      errorToast(`Error while saving. ${getFetchErrorMessage(e)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid--gap-medium">
      <Alert className="icon">
        <Icon data={info_circle} color="primary" />
        <div>
          <Typography>
            Your application needs a GitHub repository with a radixconfig.yaml
            file and a Dockerfile.
          </Typography>
          <Typography>
            You can read about{' '}
            <ExternalLink href={externalUrls.referenceRadixConfig}>
              radixconfig.yaml
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink href={externalUrls.guideDockerfileComponent}>
              Dockerfile best practices
            </ExternalLink>
            .
          </Typography>
          <Typography>
            Need help? Get in touch on our{' '}
            <ExternalLink href={externalUrls.slackRadixSupport}>
              Slack support channel
            </ExternalLink>
          </Typography>
        </div>
      </Alert>
      <fieldset
        disabled={creationState.isLoading}
        className="grid grid--gap-medium"
      >
        <TextField
          id="name_field"
          label="Name"
          helperText="Lower case; no spaces or special characters"
          name="name"
          value={applicationRegistration.name}
          onChange={handleAppRegistrationChange}
        />
        <TextField
          id="repository_field"
          label="GitHub repository"
          helperText="Full URL, e.g. 'https://github.com/equinor/my-app'"
          name="repository"
          value={applicationRegistration.repository}
          onChange={handleAppRegistrationChange}
        />
        <TextField
          id="configbranch_field"
          label="Config Branch"
          helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
          name="configBranch"
          value={applicationRegistration.configBranch}
          onChange={handleAppRegistrationChange}
        />
        <TextField
          id="radixconfig_file_field"
          label="Config file"
          helperText="The name and optionally the path of the Radix config file. By default it is radixconfig.yaml, located in the repository root folder of the config branch"
          name="radixConfigFullName"
          value={applicationRegistration.radixConfigFullName}
          onChange={handleAppRegistrationChange}
        />
        <AppConfigConfigurationItem
          configurationItemChangeCallback={handleConfigurationItemChange}
        />
        <AppConfigAdGroups
          adGroups={applicationRegistration.adGroups}
          onChange={handleAdGroupsChange}
          labeling="Administrators"
        />
        {creationState.isError && (
          <Alert type="danger">
            Failed to create application.{' '}
            {getFetchErrorMessage(creationState.error)}
          </Alert>
        )}
        <div className="o-action-bar grid grid--gap-medium">
          {creationState.isLoading && (
            <Typography>
              <CircularProgress size={24} /> Creating…
            </Typography>
          )}
          {creationState.isSuccess && creationState.data?.warnings && (
            <div className="grid grid--gap-medium">
              <List>
                {creationState.data.warnings.map((message, i) => (
                  <List.Item key={i}>
                    <Alert type="warning">{message}</Alert>
                  </List.Item>
                ))}
              </List>
              <Checkbox
                label="Proceed with warnings"
                name="acknowledgeWarnings"
                checked={acknowledgeWarnings}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAcknowledgeWarnings(e.target.checked)
                }
              />
            </div>
          )}
          <div>
            <Button color="primary" type="submit">
              Create new app
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
