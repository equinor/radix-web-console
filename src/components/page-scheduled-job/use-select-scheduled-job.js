import { useEffect, useState } from 'react';

import { ScheduledJobSummaryModelNormalizer } from '../../models/scheduled-job-summary/normalizer';

export const useSelectScheduledJob = (
  environment,
  jobComponentName,
  scheduledJobName
) => {
  const [scheduledJob, setScheduledJob] = useState();

  useEffect(() => {
    const component = environment?.activeDeployment?.components?.find(
      (comp) => comp.name === jobComponentName
    );

    const selectedScheduledJob = component?.scheduledJobList?.find(
      (scheduledJob) => scheduledJob.name === scheduledJobName
    );

    setScheduledJob(ScheduledJobSummaryModelNormalizer(selectedScheduledJob));
  }, [environment, jobComponentName, scheduledJobName]);

  return scheduledJob;
};

export default useSelectScheduledJob;
