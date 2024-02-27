import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';

export interface EnvironmentComponentProps {
  url: string;
}

export const DNSAlias: FunctionComponent<EnvironmentComponentProps> = ({
  url,
}) => (
  <>
    <Typography link href={`https://${url}`}>
      {url} <Icon data={external_link} size={16} />
    </Typography>
  </>
);
