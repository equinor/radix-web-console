import { Icon, Typography } from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';

export interface CommitHashProps {
  commit: string;
  repo?: string;
}

const TRAIL_CHARS: number = 7;

export const CommitHash = (props: CommitHashProps): JSX.Element =>
  props.commit?.length > 0 ? (
    <Typography
      link={!!props.repo}
      {...(props.repo
        ? {
            title: 'Open commit in repository',
            href: `${props.repo}/commit/${props.commit}`,
            token: { textDecoration: 'none' },
          }
        : { as: 'span', token: { color: 'currentColor' } })}
    >
      {props.commit.slice(0, TRAIL_CHARS)}{' '}
      {props.repo && <Icon data={github} />}
    </Typography>
  ) : null;
