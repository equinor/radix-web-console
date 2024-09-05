import { Typography } from '@equinor/eds-core-react';
import type { FunctionComponent } from 'react';

import { linkToGitHubTag } from '../../utils/string';

export const GitTagLinks: FunctionComponent<{
  gitTags: string;
  repository?: string;
}> = ({ gitTags, repository }) => (
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
