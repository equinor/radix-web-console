import { List, Tooltip, Typography } from '@equinor/eds-core-react';
import { type FunctionComponent, useState } from 'react';
import { linkToGitHubTag } from '../../utils/string';
import { ScrimPopup } from '../scrim-popup';

import './style.css';
import { ExternalLink } from '../link/external-link';

const Tag: FunctionComponent<{
  repository: string;
  tag: string;
  tagTitle: string;
}> = ({ repository, tag, tagTitle }) => (
  <ExternalLink href={linkToGitHubTag(repository, tag)} icon={null}>
    <div className="tags">{tagTitle}</div>
  </ExternalLink>
);

const ShortenedTag: FunctionComponent<{ repository: string; tag: string }> = ({
  repository,
  tag,
}) => {
  const tagTitle =
    tag?.length > 25 ? `${tag.substring(0, 8)}...${tag.slice(-12)}` : tag;
  return tag && tagTitle != tag ? (
    <Tooltip placement="top" title={tag}>
      <div>
        <Tag tag={tag} tagTitle={tagTitle} repository={repository} />
      </div>
    </Tooltip>
  ) : (
    <Tag tag={tag} tagTitle={tagTitle} repository={repository} />
  );
};

const TagList: FunctionComponent<{ repository: string; tags: string[] }> = ({
  repository,
  tags,
}) => (
  <List>
    {tags.map((tag) => (
      <List.Item key={tag}>
        <ShortenedTag tag={tag} repository={repository} />
      </List.Item>
    ))}
  </List>
);

export const GitTagLinks: FunctionComponent<{
  gitTags: string;
  repository?: string;
}> = ({ gitTags, repository }) => {
  const [visibleScrim, setVisibleScrim] = useState(false);
  const gitTagList = gitTags?.split(/[ ,]+/) || [];
  return (
    <>
      {!gitTagList.length ? (
        <></>
      ) : gitTagList.length == 1 ? (
        <ShortenedTag tag={gitTagList[0]} repository={repository} />
      ) : gitTags.length < 20 ? (
        gitTagList
          .map((tag) => tag.trim())
          .map((tag) => (
            <ShortenedTag key={tag} tag={tag} repository={repository} />
          ))
      ) : (
        <>
          <Typography
            link
            onClick={() => setVisibleScrim(!visibleScrim)}
            token={{ textDecoration: 'none' }}
          >
            Multiple tags
          </Typography>
          <ScrimPopup
            title={'Tags'}
            open={!!visibleScrim}
            onClose={() => setVisibleScrim(false)}
            isDismissable
          >
            <div className="multiple-tags-content">
              <TagList tags={gitTagList} repository={repository} />
            </div>
          </ScrimPopup>
        </>
      )}
    </>
  );
};
