import { PageStep } from '.';

import { RadixJobCondition } from '../../models/radix-api/jobs/radix-job-condition';
import { StepModel } from '../../models/radix-api/jobs/step';
import { StepModelNormalizer } from '../../models/radix-api/jobs/step/normalizer';

const noop = () => void 0;

const stepSucceeded: StepModel = {
  name: 'clone',
  status: RadixJobCondition.Succeeded,
  started: new Date('2019-01-18T14:49:27Z'),
  ended: new Date('2019-01-18T14:49:28Z'),
};

export default (
  <>
    {['stepA', 'stepB'].map((x, i) => (
      <div key={i}>
        <PageStep
          appName="MyApp"
          step={StepModelNormalizer(stepSucceeded)}
          stepName={x}
          jobName="MyJob"
          subscribe={noop}
          unsubscribe={noop}
        />
      </div>
    ))}
  </>
);
