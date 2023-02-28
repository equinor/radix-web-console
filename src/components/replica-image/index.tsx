import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../../models/replica-summary';
import { parseImageDigest, parseImageTag } from '../../utils/docker';

export interface ReplicaImageProps {
  replica?: ReplicaSummaryNormalizedModel;
}

export const ReplicaImage = ({ replica }: ReplicaImageProps): JSX.Element => {
  const [image, setImage] = useState<string>();
  const [digest, setDigest] = useState<string>();
  useEffect(() => {
    setImage(parseImageTag(replica?.image).image);
    setDigest(parseImageDigest(replica?.imageId).digest);
  }, [replica]);

  return (
    <>
      <Typography>
        Image <strong>{image}</strong>
      </Typography>
      <Typography>
        Digest <strong className="word-break-all">{digest}</strong>
      </Typography>
    </>
  );
};

ReplicaImage.propTypes = {
  replica: PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap),
} as PropTypes.ValidationMap<ReplicaImageProps>;