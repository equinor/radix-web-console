import React from 'react';

import AppSummary from '.';

export default (
  <AppSummary
    app={{
      apiVersion: 'radix.equinor.com/v1',
      kind: 'RadixApplication',
      metadata: {
        name: 'A Name'
      },
      spec: {},
      public: true,
      buildStatus: 'Building',
      buildTimestamp: '2018-08-03T08:20:39Z',
    }}
  />
);
