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
import { ChangeEvent, FormEvent, useState } from 'react';

import { Alert } from '../alert';
// import { AppConfigAdGroups } from '../app-config-ad-groups';
import {
  AppConfigConfigurationItem,
  OnConfigurationItemChangeCallback,
} from '../app-config-ci';
// import { HandleAdGroupsChangeCB } from '../graph/adGroups';
import { externalUrls } from '../../externalUrls';
import {
  ApplicationRegistration,
  ApplicationRegistrationUpsertResponse,
  useRegisterApplicationMutation,
} from '../../store/radix-api';
import {
  errorToast,
  successToast,
  warningToast,
} from '../global-top-nav/styled-toaster';
import { getFetchErrorMessage } from '../../store/utils';

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
    });

  // const handleAdGroupsChange: HandleAdGroupsChangeCB = (value) => {
  //   setAppRegistration((current) => ({
  //     ...current,
  //     adGroups: value.map((x) => x.id),
  //   }));
  // };

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

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault();
      const response: ApplicationRegistrationUpsertResponse = await createApp({
        applicationRegistrationRequest: {
          applicationRegistration,
          acknowledgeWarnings,
        },
      }).unwrap();

      //Only call onCreated when created without warnings, or created with ack warnings
      if (!response.warnings?.length || acknowledgeWarnings) {
        onCreated(response.applicationRegistration);
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
            <Typography
              link
              href={externalUrls.referenceRadixConfig}
              rel="noopener noreferrer"
              target="_blank"
            >
              radixconfig.yaml
            </Typography>{' '}
            and{' '}
            <Typography
              link
              href={externalUrls.guideDockerfileComponent}
              rel="noopener noreferrer"
              target="_blank"
            >
              Dockerfile best practices
            </Typography>
            .
          </Typography>
          <Typography>
            Need help? Get in touch on our{' '}
            <Typography
              link
              href={externalUrls.slackRadixSupport}
              rel="noopener noreferrer"
              target="_blank"
            >
              Slack support channel
            </Typography>
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
        {/*<AppConfigAdGroups*/}
        {/*  adGroups={applicationRegistration.adGroups}*/}
        {/*  handleAdGroupsChange={handleAdGroupsChange}*/}
        {/*  labeling="Administrators"*/}
        {/*/>*/}
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
