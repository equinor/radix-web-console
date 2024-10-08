import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { type FunctionComponent, useEffect, useState } from 'react';

import type { ReplicaSummary } from '../../store/radix-api';
import { parseImageDigest, parseImageTag } from '../../utils/docker';

export const ReplicaImage: FunctionComponent<{ replica?: ReplicaSummary }> = ({
  replica,
}) => {
  const [image, setImage] = useState<string>();
  const [digest, setDigest] = useState<string>();
  useEffect(() => {
    setImage(parseImageTag(replica?.image).image);
    setDigest(parseImageDigest(replica?.imageId).digest);
  }, [replica]);

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
  );
};

ReplicaImage.propTypes = {
  replica: PropTypes.object as PropTypes.Validator<ReplicaSummary>,
};
