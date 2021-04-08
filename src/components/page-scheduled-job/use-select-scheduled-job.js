import { useState, useEffect } from 'react';

const useSelectScheduledJob = (
  environment,
  jobComponentName,
  scheduledJobName
) => {
  const [scheduledJob, setScheduledJob] = useState();

  useEffect(() => {
    const deployment = environment ? environment.activeDeployment : null;

    const component =
      deployment && deployment.components
        ? deployment.components.find((comp) => comp.name === jobComponentName)
        : null;

    const selectedScheduledJob =
      component && component.scheduledJobList
        ? component.scheduledJobList.find(
            (scheduledJob) => scheduledJob.name === scheduledJobName
          )
        : null;
    setScheduledJob(selectedScheduledJob);
  }, [environment, jobComponentName, scheduledJobName]);

  return scheduledJob;
};

export default useSelectScheduledJob;
