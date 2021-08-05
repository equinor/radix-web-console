import { Typography } from '@equinor/eds-core-react';
import React from 'react';

import ConfigList from '../config-list';
import Panel from '../panel';

const PageAbout = () => {
  return (
    <Panel>
      <Typography variant="overline">
        Radix Web Console [{process.env.REACT_APP_NAME}@
        {process.env.REACT_APP_VERSION}]
      </Typography>
      <Typography variant="h2">Configuration</Typography>
      <ConfigList />
    </Panel>
  );
};

export default PageAbout;
