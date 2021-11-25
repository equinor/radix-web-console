import PropTypes from 'prop-types';
import ReplicaSummaryModel from '../../models/replica-summary';
import { Typography } from '@equinor/eds-core-react';
import { parseImageTag, parseImageDigest } from '../../utils/docker';
import { useEffect, useState } from 'react';

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
  replica: PropTypes.exact(ReplicaSummaryModel),
};

export default ReplicaImage;
