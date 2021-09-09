import React from 'react';

import { PageStep } from '.';
import stepNormaliser from '../../models/step/normaliser';

const stepSucceeded = {
  name: 'clone',
  status: 'Succeeded',
  started: '2019-01-18T14:49:27Z',
  ended: '2019-01-18T14:49:28Z',
};
const stepRunning = {
  name: 'clone',
  status: 'Running',
  started: '2019-01-18T14:49:27Z',
};

const noop = () => {};

export default (
  <>
    <div>
      <PageStep
        appName="MyApp"
        step={stepNormaliser(stepSucceeded)}
        stepName="AStep"
        jobName="MyJob"
        subscribe={noop}
        unsubscribe={noop}
      />
    </div>
    <div>
      <PageStep
        appName="MyApp"
        step={stepNormaliser(stepRunning)}
        stepName="AStep"
        jobName="MyJob"
        subscribe={noop}
        unsubscribe={noop}
      />
    </div>
  </>
);
