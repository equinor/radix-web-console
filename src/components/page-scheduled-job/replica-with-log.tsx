import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { downloadLazyLogCb, downloadLazyLogPromise } from '../code/log-helper';
import { Replica } from '../replica';
import { radixApi, ReplicaSummary } from '../../store/radix-api';
import { logApi } from '../../store/log-api';
import { FetchQueryResult } from '../../store/types';

import './style.css';

export const ReplicaWithLog: FunctionComponent<{
  header: string;
  appName: string;
  jobComponentName: string;
  envName: string;
  scheduledJobName: string;
  replica?: ReplicaSummary;
  logState?: FetchQueryResult<string>;
}> = ({
  header,
  appName,
  envName,
  jobComponentName,
  scheduledJobName,
  replica,
  logState,
}) => {
  const [getLog] = radixApi.endpoints.jobLog.useLazyQuery();
  const [getHistoryLog] = logApi.endpoints.getJobReplicaLog.useLazyQuery();
  return (
    <Replica
      header={header}
      replica={replica}
      logState={logState}
      downloadCb={downloadLazyLogCb(
        `${replica.name}.txt`,
        getLog,
        {
          appName,
          envName,
          jobComponentName,
          scheduledJobName,
          replicaName: replica.name,
          file: 'true',
        },
        false
      )}
      getHistoryLog={async () => {
        return await getHistoryLog({
          appName: appName,
          envName: envName,
          jobComponentName: jobComponentName,
          jobName: scheduledJobName,
          replicaName: replica.name,
          tail: 1000,
        }).unwrap();
      }}
      downloadHistoryCb={() =>
        downloadLazyLogPromise(
          `${replica.name}.txt`,
          () =>
            getHistoryLog({
              appName: appName,
              envName: envName,
              jobComponentName: jobComponentName,
              jobName: scheduledJobName,
              replicaName: replica.name,
              file: true,
            }).unwrap() as unknown as Promise<string>
        )
      }
    />
  );
};

ReplicaWithLog.propTypes = {
  header: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
  replica: PropTypes.object as PropTypes.Validator<ReplicaSummary>,
  logState: PropTypes.object as PropTypes.Validator<FetchQueryResult<string>>,
};
