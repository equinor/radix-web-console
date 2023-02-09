import { Typography } from '@equinor/eds-core-react';

import { linkToGitHubTag } from '../../utils/string';

export const GitTagLinks = ({
  gitTags,
  repository,
}: {
  gitTags: string;
  repository?: string;
}): JSX.Element => (
  <>
    {gitTags
      .split(/[ ,]+/)
      .map((tag) => tag.trim())
      .map((tag, i, arr) => (
        <Typography
          key={i}
          token={{ textDecoration: 'none' }}
          {...(repository && {
            link: true,
            href: linkToGitHubTag(repository, tag),
            rel: 'noopener noreferrer',
            target: '_blank',
          })}
        >
          {`${tag}${arr.length - 1 !== i ? ', ' : ''}`}
        </Typography>
      ))}
  </>
);
