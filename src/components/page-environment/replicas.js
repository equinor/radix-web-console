import { Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';

import * as routing from '../../utils/routing';
import { smallReplicaName } from '../../utils/string';

export const Replicas = ({ appName, envName, componentName, replicaList }) => (
  <>
    {replicaList?.length > 0 ? (
      replicaList
        .map((replica, i) => (
          <Link
            key={i}
            to={routing.getReplicaUrl(
              appName,
              envName,
              componentName,
              replica.name
            )}
          >
            <Typography link as="span">
              {smallReplicaName(replica.name)}
            </Typography>
          </Link>
        ))
        .reduce((prev, curr) => [
          ...(Array.isArray(prev) ? prev : [prev]),
          ', ',
          curr,
        ])
    ) : (
      <span>No active replicas</span>
    )}
  </>
);

export default Replicas;
