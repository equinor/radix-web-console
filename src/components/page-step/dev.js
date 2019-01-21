import React from 'react';

import { PageStep } from '.';

const step = {
  name: 'clone',
  status: 'Succeeded',
  started: '2019-01-18T14:49:27Z',
  ended: '2019-01-18T14:49:28Z',
};

const noop = () => {};

export default (
  <PageStep
    appName="MyApp"
    step={step}
    jobName="MyJob"
    subscribeJob={noop}
    unsubscribeJob={noop}
  />
);
