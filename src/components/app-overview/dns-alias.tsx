import { Icon, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { DNSAliasModel } from '../../models/radix-api/applications/dns-alias';
import { getActiveComponentUrl, getEnvUrl } from '../../utils/routing';

export interface DefaultAppAliasProps {
  appName: string;
  dnsAlias?: DNSAliasModel[];
}

export const DNSAlias: FunctionComponent<DefaultAppAliasProps> = ({
  appName,
  dnsAlias,
}) => {
  return (
    <>
      {dnsAlias.length > 0 && (
        <>
          <Typography variant="h4">DNS aliases</Typography>
          {dnsAlias.map((dnsAlias, index) => (
            <div key={index} className="grid grid--gap-small">
              <Typography>
                <Icon data={link} />
                <Typography link href={`https://${dnsAlias.url}`}>
                  {dnsAlias.url}
                </Typography>{' '}
                is mapped to component{' '}
                <Typography
                  as={Link}
                  to={getActiveComponentUrl(
                    appName,
                    dnsAlias.environmentName,
                    dnsAlias.componentName
                  )}
                  link
                >
                  {dnsAlias.componentName}
                </Typography>{' '}
                in environment{' '}
                <Typography
                  as={Link}
                  to={getEnvUrl(appName, dnsAlias.environmentName)}
                  link
                >
                  {dnsAlias.environmentName}
                </Typography>
              </Typography>
            </div>
          ))}
        </>
      )}
    </>
  );
};
