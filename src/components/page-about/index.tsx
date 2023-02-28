import { Typography } from '@equinor/eds-core-react';

import { ConfigList } from '../config-list';
import { AvailabilityCharts } from '../data-chart';

export const PageAbout = (): JSX.Element => (
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