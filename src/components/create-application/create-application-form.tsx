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
import { type FormEvent, useRef, useState } from 'react';
import { externalUrls } from '../../externalUrls';
import type { ApplicationRegistration } from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils/parse-errors';
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
  onNext: () => unknown;
};
export function CreateApplicationForm({
  registration,
  onCreate,
  onNext,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [warnings, setWarnings] = useState<string[]>([]);
  const [adUsers, setAdUsers] = useState<Readonly<AdGroupItem>[]>();

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    setError(undefined);
    setWarnings([]);
    try {
      ev.preventDefault();

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

      if (wrns.length > 0) {
        setTimeout(() => contentRef.current?.scrollIntoView(false), 0);
      }
    } catch (e) {
      errorToast(`Error while saving. ${getFetchErrorMessage(e)}`);
      setTimeout(() => contentRef.current?.scrollIntoView(false), 0);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-app">
      <div className="create-app-content">
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
            // @ts-expect-error Textfield does actually allow JSX
            helperText={
              <span>
                Must be exactly the same as <em>name</em> in{' '}
                <em>radixconfig.yaml</em> file. Lower case; no spaces or special
                characters
              </span>
            }
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
            // @ts-expect-error Textfield does actually allow JSX
            helperText={
              <span>
                The name of the branch where Radix will read the{' '}
                <em>radixconfig.yaml</em> from, e.g. 'main' or 'master'
              </span>
            }
            name="configBranch"
            defaultValue={registration?.configBranch ?? 'main'}
          />
          <TextField
            id="radixconfig_file_field"
            label="Config file"
            helperText="The name and optionally the path of the Radix config file. Located in the repository root folder of the config branch"
            name="radixConfigFullName"
            defaultValue={
              registration?.radixConfigFullName ?? 'radixconfig.yaml'
            }
          />
          <AppConfigConfigurationItem
            name="configurationItem"
            configurationItem={Number(registration?.configurationItem)}
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
          <div className="o-action-bar grid grid--gap-medium" ref={contentRef}>
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
                  disabled={loading || !!registration}
                  label="Proceed with warnings"
                  name="acknowledgeWarnings"
                />
              </div>
            )}
          </div>
        </fieldset>
      </div>
      <div className="create-app-footer">
        {registration ? (
          <Button onClick={onNext} type="button">
            Next: Configure Deploykey
          </Button>
        ) : (
          <Button color="primary" type="submit">
            Create new app
          </Button>
        )}
      </div>
    </form>
  );
}

function sanitizeName(name: string): string {
  // force name to lowercase, no spaces
  return name?.toLowerCase().replace(/[^a-z0-9]/g, '-') ?? '';
}
