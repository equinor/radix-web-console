import { Typography } from '@equinor/eds-core-react';
import { linkToGitHubTag } from '../../utils/string';

export const GitTagLinks = ({
  repository,
  gitTags,
}: {
  repository: string;
  gitTags: string;
}): JSX.Element => {
  const gitTagsArray = gitTags.split(/[ ,]+/);

  return (
    <>
      {gitTagsArray.map((element, i) => (
        <Typography
          key={i}
          link
          href={linkToGitHubTag(repository, element.trim())}
          token={{ textDecoration: 'none' }}
        >
          {element.trim()}{' '}
        </Typography>
      ))}
    </>
  );
};
