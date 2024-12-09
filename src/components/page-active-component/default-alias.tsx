import { Typography } from '@equinor/eds-core-react';
import type { ApplicationAlias } from '../../store/radix-api';
import { ExternalLink } from '../link/external-link';

export interface Props {
  appAlias?: ApplicationAlias;
  envName: string;
  componentName: string;
}

export function DefaultAlias({ appAlias, envName, componentName }: Props) {
  return (
    <>
      {appAlias &&
        appAlias.componentName === componentName &&
        appAlias.environmentName === envName && (
          <Typography>
            This component is the{' '}
            <ExternalLink href={`https://${appAlias.url}`}>
              default alias
            </ExternalLink>
          </Typography>
        )}
    </>
  );
}
