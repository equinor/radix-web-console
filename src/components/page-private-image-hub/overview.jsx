import { Typography } from '@equinor/eds-core-react';

export const Overview = ({ server, username }) => (
  <>
    <Typography variant="body_short">
      Server <strong>{server}</strong>
    </Typography>
    <Typography variant="body_short">
      Username <strong>{username}</strong>
    </Typography>
  </>
);

export default Overview;
