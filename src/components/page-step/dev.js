import React from 'react';

import { PageStep } from '.';
import { StepModelNormalizer } from '../../models/step/normaliser';

const stepSucceeded = {
  name: 'clone',
  status: 'Succeeded',
  started: '2019-01-18T14:49:27Z',
  ended: '2019-01-18T14:49:28Z',
};
const noop = () => {};

export default (
  <>
    <div>
      <PageStep
        appName="MyApp"
        step={StepModelNormalizer(stepSucceeded)}
        stepName="AStep"
        jobName="MyJob"
        subscribe={noop}
        unsubscribe={noop}
      />
    </div>
    <div>
      <PageStep
        appName="MyApp"
        step={StepModelNormalizer(stepSucceeded)}
        stepName="AStep"
        jobName="MyJob"
        subscribe={noop}
        unsubscribe={noop}
      />
    </div>
  </>
);
