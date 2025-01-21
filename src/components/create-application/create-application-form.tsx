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
import { type FormEvent, useState } from 'react';
import { externalUrls } from '../../externalUrls';
import type { ApplicationRegistration } from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { Alert } from '../alert';
import { AppConfigAdGroups } from '../app-config-ad-groups';
import { AppConfigConfigurationItem } from '../app-config-ci';
import { errorToast } from '../global-top-nav/styled-toaster';
import type { AdGroupItem } from '../graph/adGroups';
import { ExternalLink } from '../link/external-link';

type Props = {
  registration?: ApplicationRegistration;
  onCreate: (
    application: ApplicationRegistration,
    acknowledgeWarnings: boolean
  ) => Promise<string[]>;
};
export function CreateApplicationForm({ registration, onCreate }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [warnings, setWarnings] = useState<string[]>([]);
  const [adUsers, setAdUsers] = useState<Readonly<AdGroupItem>[]>();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    try {
      const data = new FormData(ev.currentTarget);
      const applicationRegistration: Partial<ApplicationRegistration> = {
        name: sanitizeName(data.get('name')?.toString() ?? ''),
        repository: data.get('repository')?.toString(),
        adGroups: adUsers?.filter((x) => x.type === 'Group')?.map((x) => x.id),
        adUsers: adUsers
          ?.filter((x) => x.type === 'ServicePrincipal')
          ?.map((x) => x.id),
        configBranch: data.get('configBranch')?.toString(),
        radixConfigFullName: data.get('radixConfigFullName')?.toString(),
        configurationItem: data.get('configurationItem')?.toString(),
      };

      const acknowledgeWarnings = data.get('acknowledgeWarnings') === 'on';

      // @ts-expect-error we dont do any form validation
      const application: ApplicationRegistration = applicationRegistration;

      const wrns = await onCreate(application, acknowledgeWarnings);
      setWarnings(wrns);
    } catch (e) {
      errorToast(`Error while saving. ${getFetchErrorMessage(e)}`);
      setError(e);
    } finally {
      setLoading(false);
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
        disabled={loading || !!registration}
        className="grid grid--gap-medium"
      >
        <TextField
          id="name_field"
          label="Name"
          helperText="Lower case; no spaces or special characters"
          name="name"
          defaultValue={registration?.name}
        />
        <TextField
          id="repository_field"
          label="GitHub repository"
          helperText="Full URL, e.g. 'https://github.com/equinor/my-app'"
          name="repository"
          defaultValue={registration?.repository}
        />
        <TextField
          id="configbranch_field"
          label="Config Branch"
          helperText="The name of the branch where Radix will read the radixconfig.yaml from, e.g. 'main' or 'master'"
          name="configBranch"
          defaultValue={registration?.configBranch ?? 'main'}
        />
        <TextField
          id="radixconfig_file_field"
          label="Config file"
          helperText="The name and optionally the path of the Radix config file. By default it is radixconfig.yaml, located in the repository root folder of the config branch"
          name="radixConfigFullName"
          defaultValue={registration?.radixConfigFullName ?? 'radixconfig.yaml'}
        />
        <AppConfigConfigurationItem
          name="configurationItem"
          configurationItem={registration?.configurationItem}
        />
        <AppConfigAdGroups
          name="adGroups"
          adGroups={adUsers?.map((x) => x.id) || registration?.adGroups}
          onChange={(items) => setAdUsers([...items])}
          labeling="Administrators"
        />
        {error ? (
          <Alert type="danger">
            Failed to create application.
            <br />
            {getFetchErrorMessage(error)}
          </Alert>
        ) : null}
        <div className="o-action-bar grid grid--gap-medium">
          {loading && (
            <Typography>
              <CircularProgress size={24} /> Creating…
            </Typography>
          )}
          {warnings.length > 0 && (
            <div className="grid grid--gap-medium">
              <List>
                {warnings.map((message, i) => (
                  <List.Item key={i}>
                    <Alert type="warning">{message}</Alert>
                  </List.Item>
                ))}
              </List>
              <Checkbox
                label="Proceed with warnings"
                name="acknowledgeWarnings"
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

function sanitizeName(name: string): string {
  // force name to lowercase, no spaces
  return name?.toLowerCase().replace(/[^a-z0-9]/g, '-') ?? '';
}