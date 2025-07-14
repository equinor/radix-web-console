import { Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import type { ReplicaSummary } from '../../store/radix-api';
import { parseImageDigest, parseImageTag } from '../../utils/docker';

type props = { replica?: ReplicaSummary };
export const ReplicaImage = ({ replica }: props) => {
  const image = parseImageTag(replica?.image ?? '').image;
  const imageInSpec = parseImageTag(replica?.imageInSpec ?? '').image;
  const digest = parseImageDigest(replica?.imageId ?? '').digest;

  return (
    <>
      {image && image === imageInSpec && (
        <Typography>
          Image <strong>{image}</strong>
        </Typography>
      )}
      {image && imageInSpec && image !== imageInSpec && (
        <>
          <Typography>
            Image in spec <strong>{imageInSpec}</strong>
            <Tooltip
              title={
                <>
                  <strong>Image in spec</strong> is the image defined in the
                  deployment or job template spec.
                  <br />
                  <strong>Image running</strong> has the same{' '}
                  <strong>digest</strong>, Kubernetes pulled it
                  <br />
                  because it is more recent than the{' '}
                  <strong>Image in spec</strong>
                  <br />
                  Read more
                  https://kubernetes.io/docs/concepts/containers/images
                </>
              }
            >
              <Icon data={info_circle} />
            </Tooltip>
          </Typography>
          <Typography>
            Image running <strong>{image}</strong>
          </Typography>
        </>
      )}
      {digest && (
        <Typography>
          Digest <strong className="word-break-all">{digest}</strong>
        </Typography>
      )}
    </>
  );
};
