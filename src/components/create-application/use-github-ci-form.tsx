import { Checkbox, Typography } from '@equinor/eds-core-react';
import { externalUrls } from '../../externalUrls';
import { ExternalLink } from '../link/external-link';

type Props = {
  useGithub: boolean;
  setUseGithub: (useGithub: boolean) => unknown;
};
export function UseGithubCIForm({ useGithub, setUseGithub }: Props) {
  return (
    <label htmlFor={'deployOnly'} className="check-input">
      <Checkbox
        id={'deployOnly'}
        name="deployOnly"
        checked={useGithub}
        onChange={(e) => setUseGithub(e.target.checked)}
      />{' '}
      <span className="grid grid--gap-small">
        <Typography
          className="label"
          group="input"
          variant="text"
          token={{ color: 'currentColor' }}
        >
          Use Radix for CI (build)
        </Typography>
        <Typography token={{ color: 'currentColor' }}>
          Unselect this option if your project is hosted on multiple
          repositories and/or requires external control of building. Radix will
          no longer need a webhook and will instead deploy your app through the
          API/CLI. Read the{' '}
          <ExternalLink href={externalUrls.deployOnlyGuide}>
            Deployment Guide
          </ExternalLink>{' '}
          for details.
        </Typography>
      </span>
    </label>
  );
}
