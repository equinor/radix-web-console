import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';

import { ConfigList } from '../config-list';
import { AvailabilityCharts } from '../data-chart';

export const PageAbout: FunctionComponent = () => (
  <div className="panel grid grid--gap-small">
    <Typography variant="overline">
      Radix Web Console [{import.meta.env.PACKAGE_NAME}@
      {import.meta.env.PACKAGE_VERSION}]
    </Typography>
    <AvailabilityCharts />
    <Typography variant="h4">Configuration</Typography>
    <ConfigList />
  </div>
);

export default PageAbout;
