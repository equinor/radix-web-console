import { useState, useEffect } from 'react';

const useSelectScheduledJob = (environment, componentName, scheduledJobName) => {
  const [scheduledJob, setScheduledJob] = useState();

  useEffect(() => {
    const deployment = environment ? environment.activeDeployment : null;

    const component =
      deployment && deployment.components
        ? deployment.components.find((comp) => comp.name === componentName)
        : null;

    const selectedScheduledJob =
      component && component.replicaList
        ? component.replicaList.find((scheduledJob) => scheduledJob.name === scheduledJobName)
        : null;
    setScheduledJob(selectedScheduledJob);
  }, [environment, componentName, scheduledJobName]);

  return scheduledJob;
};

export default useSelectScheduledJob;
