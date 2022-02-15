import { useState, useEffect } from 'react';
import scheduledJobSummaryNormaliser from '../../models/scheduled-job-summary/normaliser';

const useSelectScheduledJob = (
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

    setScheduledJob(scheduledJobSummaryNormaliser(selectedScheduledJob));
  }, [environment, jobComponentName, scheduledJobName]);

  return scheduledJob;
};

export default useSelectScheduledJob;
