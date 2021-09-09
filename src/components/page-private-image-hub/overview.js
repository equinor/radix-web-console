import React from 'react';
import { Typography } from '@equinor/eds-core-react';

const Overview = (props) => (
  <>
    <Typography variant="body_short">
      Server <strong>{props.server}</strong>
    </Typography>
    <Typography variant="body_short">
      Username <strong>{props.username}</strong>
    </Typography>
  </>
);

export default Overview;
