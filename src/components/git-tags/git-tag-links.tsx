import { List, Tooltip, Typography } from '@equinor/eds-core-react'
import { useState } from 'react'
import { linkToGitHubTag } from '../../utils/string'
import { ScrimPopup } from '../scrim-popup'
import './style.css'
import { ExternalLink } from '../link/external-link'

type TagProps = {
  repository: string
  tag: string
  tagTitle: string
}
const Tag = ({ repository, tag, tagTitle }: TagProps) => (
  <ExternalLink href={linkToGitHubTag(repository, tag)} icon={undefined}>
    <div className="tags">{tagTitle}</div>
  </ExternalLink>
)

type ShortenedTagProps = { repository: string; tag: string }
const ShortenedTag = ({ repository, tag }: ShortenedTagProps) => {
  const tagTitle = tag?.length > 25 ? `${tag.substring(0, 8)}...${tag.slice(-12)}` : tag
  return tag && tagTitle != tag ? (
    <Tooltip placement="top" title={tag}>
      <div>
        <Tag tag={tag} tagTitle={tagTitle} repository={repository} />
      </div>
    </Tooltip>
  ) : (
    <Tag tag={tag} tagTitle={tagTitle} repository={repository} />
  )
}

type TagListProps = { repository: string; tags: string[] }
const TagList = ({ repository, tags }: TagListProps) => (
  <List>
    {tags.map((tag) => (
      <List.Item key={tag}>
        <ShortenedTag tag={tag} repository={repository} />
      </List.Item>
    ))}
  </List>
)

type Props = {
  gitTags?: string
  repository?: string
}
export const GitTagLinks = ({ gitTags, repository }: Props) => {
  const [visibleScrim, setVisibleScrim] = useState(false)
  const gitTagList = gitTags?.split(/[ ,]+/) || []

  if (!repository || !gitTags || gitTagList.length === 0) return null

  return (
    <>
      {gitTagList.length == 1 ? (
        <ShortenedTag tag={gitTagList[0]} repository={repository} />
      ) : gitTags.length < 20 ? (
        gitTagList.map((tag) => tag.trim()).map((tag) => <ShortenedTag key={tag} tag={tag} repository={repository} />)
      ) : (
        <>
          <Typography link onClick={() => setVisibleScrim(!visibleScrim)} token={{ textDecoration: 'none' }}>
            Multiple tags
          </Typography>
          <ScrimPopup title={'Tags'} open={!!visibleScrim} onClose={() => setVisibleScrim(false)} isDismissable>
            <div className="multiple-tags-content">
              <TagList tags={gitTagList} repository={repository} />
            </div>
          </ScrimPopup>
        </>
      )}
    </>
  )
}
