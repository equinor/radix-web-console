import { PageStep } from '.';

import { RadixJobCondition } from '../../models/radix-job-condition';
import { StepModel } from '../../models/step';
import { StepModelNormalizer } from '../../models/step/normaliser';

const noop = () => {};

const stepSucceeded: StepModel = {
  name: 'clone',
  status: RadixJobCondition.Succeeded,
  started: new Date('2019-01-18T14:49:27Z'),
  ended: new Date('2019-01-18T14:49:28Z'),
};

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
