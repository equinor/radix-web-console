import { Icon, List, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { getActiveComponentUrl, getEnvUrl } from '../../utils/routing';
import { DnsExternalAlias } from '../../store/radix-api';

export interface ExternalAliasesProps {
  appName: string;
  dnsExternalAliases?: DnsExternalAlias[];
}

export const DNSExternalAliases: FunctionComponent<ExternalAliasesProps> = ({
  appName,
  dnsExternalAliases,
}) => (
  <>
    {dnsExternalAliases && (
      <div className="grid grid--gap-x-small">
        <Typography variant="h4">
          External DNS alias{dnsExternalAliases.length > 1 ? 'es' : ''}
        </Typography>
        <List>
          {dnsExternalAliases?.map((dnsExternalAlias, index) => (
            <div key={index} className="o-item-list">
              <Typography>
                <Icon data={link} />
                <Typography link href={`https://${dnsExternalAlias.url}`}>
                  {dnsExternalAlias.url}
                </Typography>{' '}
                is mapped to component{' '}
                <Typography
                  as={Link}
                  to={getActiveComponentUrl(
                    appName,
                    dnsExternalAlias.environmentName,
                    dnsExternalAlias.componentName
                  )}
                  link
                >
                  {dnsExternalAlias.componentName}
                </Typography>{' '}
                in environment{' '}
                <Typography
                  as={Link}
                  to={getEnvUrl(appName, dnsExternalAlias.environmentName)}
                  link
                >
                  {dnsExternalAlias.environmentName}
                </Typography>
              </Typography>
            </div>
          ))}
        </List>
      </div>
    )}
  </>
);
