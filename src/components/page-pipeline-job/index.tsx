import { DocumentTitle } from '../document-title';
import { JobOverview } from '../job-overview';

type Props = {
  appName: string;
  jobName: string;
};
export default function PipelinePageJob({ appName, jobName }: Props) {
  return (
    <>
      <DocumentTitle title={`Pipeline Job ${jobName}`} />
      <JobOverview appName={appName} jobName={jobName} />
    </>
  );
}
