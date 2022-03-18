import { useEffect, useState } from 'react';

import { ScheduledBatchSummaryModelNormalizer } from '../../models/scheduled-batch-summary/normalizer';

export const useSelectScheduledBatch = (
  environment,
  jobComponentName,
  scheduledBatchName
) => {
  const [scheduledBatch, setScheduledBatch] = useState();

  useEffect(() => {
    const component = environment?.activeDeployment?.components?.find(
      (comp) => comp.name === jobComponentName
    );

    const selectedScheduledBatch = component?.scheduledJobList?.find(
      (scheduledJob) => scheduledJob.name === scheduledBatchName
    );

    setScheduledBatch(
      ScheduledBatchSummaryModelNormalizer(selectedScheduledBatch)
    );
  }, [environment, jobComponentName, scheduledBatchName]);

  return scheduledBatch;
};

export default useSelectScheduledBatch;
