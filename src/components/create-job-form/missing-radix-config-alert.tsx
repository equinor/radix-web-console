import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import type { Application } from '../../store/radix-api';
import { Alert } from '../alert';
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link';
import { RadixConfigFileLink } from '../link/radix-config-file-link';

type Props = { application: Application };

export const MissingRadixConfigAlert = ({ application }: Props) => (
  <Alert className="icon">
    <Icon data={info_circle} color="primary" />
    <div>
      <Typography>
        The <RadixConfigFileLink registration={application?.registration} />{' '}
        file must be read by Radix before using this pipeline job.
      </Typography>
      <Typography>
        Please run{' '}
        <NewApplyConfigPipelineLink appName={application.name}>
          apply-config
        </NewApplyConfigPipelineLink>{' '}
        to read <RadixConfigFileLink registration={application?.registration} />{' '}
        from the application's GitHub repository.
      </Typography>
    </div>
  </Alert>
);
