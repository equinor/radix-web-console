import { Icon, List, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { DNSAliasModel } from '../../models/radix-api/applications/dns-alias';
import { getActiveComponentUrl, getEnvUrl } from '../../utils/routing';

export interface DefaultAppAliasProps {
  appName: string;
  dnsAliases?: DNSAliasModel[];
}

export const DnsAliases: FunctionComponent<DefaultAppAliasProps> = ({
  appName,
  dnsAliases,
}) => (
  <>
    {dnsAliases && (
      <div className="grid grid--gap-x-small">
        <Typography variant="h4">
          DNS alias{dnsAliases.length > 1 ? 'es' : ''}
        </Typography>
        <List>
          {dnsAliases?.map((dnsAlias, index) => (
            <div key={index} className="o-item-list">
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
        </List>
      </div>
    )}
  </>
);
