import React from 'react';
import PropTypes from 'prop-types';

// import useGetEnvironment from '../page-environment/use-get-environment';
// import usePollLogs from './use-poll-logs';
// import useSelectScheduledJob from './use-select-scheduled-job';
//
// import Breadcrumb from '../breadcrumb';
// import Code from '../code';
// import EnvironmentBadge from '../environment-badge';
// import AsyncResource from '../async-resource/simple-async-resource';
//
// import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
// import { routeWithParams, smallReplicaName } from '../../utils/string';
// import * as routing from '../../utils/routing';
// import ScheduledJobStatus from '../scheduled-job-status';

const STATUS_OK = 'Running';

const PageScheduledJob = (props) => {
  const {
    appName,
    envName,
    deploymentName,
    componentName,
    scheduledJobName,
  } = props;

  // const [getEnvironmentState] = useGetEnvironment(appName, envName);
  // const [pollLogsState] = usePollLogs(
  //   appName,
  //   deploymentName,
  //   componentName,
  //   scheduledJobName
  // );
  // const replica = useSelectScheduledJob(
  //   getEnvironmentState.data,
  //   componentName,
  //   scheduledJobName
  // );
  // const scheduledJobStatus = replica ? replica.replicaStatus : null;
  // const scheduledJobLog = pollLogsState && pollLogsState.data;

  return (
    <p>{appName}</p>
    // <React.Fragment>
    //   <Breadcrumb
    //     links={[
    //       { label: appName, to: routeWithParams(routes.app, { appName }) },
    //       { label: 'Environments', to: routing.getEnvsUrl(appName) },
    //       {
    //         label: <EnvironmentBadge envName={envName} />,
    //         to: routeWithParams(routes.appEnvironment, {
    //           appName,
    //           envName,
    //         }),
    //       },
    //       {
    //         to: routeWithParams(routes.appActiveScheduledJob, {
    //           appName,
    //           envName,
    //           componentName,
    //         }),
    //         label: componentName,
    //       },
    //       { label: smallReplicaName(scheduledJobName) },
    //     ]}
    //   />
    //   <main>
    //     <AsyncResource asyncState={getEnvironmentState}>
    //       <React.Fragment>
    //         <div className="o-layout-columns">
    //           <section>
    //             <h2 className="o-heading-section">Overview</h2>
    //             <p>
    //               Scheduled Job{' '}
    //               <strong>{smallReplicaName(scheduledJobName)}</strong>, job{' '}
    //               component <strong>{componentName}</strong>
    //             </p>
    //             <p>
    //               Status <ScheduledJobStatus replica={scheduledJobStatus} />
    //             </p>
    //             {scheduledJobStatus && scheduledJobStatus.status !== STATUS_OK && (
    //               <React.Fragment>
    //                 <p>Status message is:</p>
    //                 <Code wrap>{replica.statusMessage}</Code>
    //               </React.Fragment>
    //             )}
    //             <h2 className="o-heading-section">Log</h2>
    //             <AsyncResource asyncState={pollLogsState}>
    //               {scheduledJobLog && <Code copy>{scheduledJobLog}</Code>}
    //             </AsyncResource>
    //           </section>
    //         </div>
    //       </React.Fragment>
    //     </AsyncResource>
    //   </main>
    // </React.Fragment>
  );
};

PageScheduledJob.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
};

export default mapRouteParamsToProps(
  ['appName', 'envName', 'deploymentName', 'componentName', 'scheduledJobName'],
  PageScheduledJob
);
