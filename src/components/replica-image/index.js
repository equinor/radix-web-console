import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ReplicaSummaryNormalizedModelValidationMap } from '../../models/replica-summary';
import { parseImageDigest, parseImageTag } from '../../utils/docker';

export const ReplicaImage = ({ replica }) => {
  const [image, setImage] = useState();
  const [digest, setDigest] = useState();
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
        Digest <strong className="text-break-all">{digest}</strong>
      </Typography>
    </>
  );
};

ReplicaImage.propTypes = {
  replica: PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap),
};

export default ReplicaImage;
