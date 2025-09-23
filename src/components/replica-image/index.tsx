import { Typography } from '@equinor/eds-core-react'
import type { ReplicaSummary } from '../../store/radix-api'
import { parseImageDigest, parseImageTag } from '../../utils/docker'

type props = { replica?: ReplicaSummary }
export const ReplicaImage = ({ replica }: props) => {
  const image = parseImageTag(replica?.image ?? '').image
  const digest = parseImageDigest(replica?.imageId ?? '').digest

  return (
    <>
      {image && (
        <Typography>
          Image <strong>{image}</strong>
        </Typography>
      )}
      {digest && (
        <Typography>
          Digest <strong className="word-break-all">{digest}</strong>
        </Typography>
      )}
    </>
  )
}
