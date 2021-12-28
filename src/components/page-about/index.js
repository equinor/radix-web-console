import { Typography } from '@equinor/eds-core-react';
import React from 'react';
import AvailabilityCharts from '../data-chart';

import ConfigList from '../config-list';

const PageAbout = () => {
  return (
    <div className="panel grid grid--gap-small">
      <Typography variant="overline">
        Radix Web Console [{process.env.REACT_APP_NAME}@
        {process.env.REACT_APP_VERSION}]
      </Typography>
      <AvailabilityCharts />
      <Typography variant="h4">Configuration</Typography>
      <ConfigList />
    </div>
  );
};

export default PageAbout;
