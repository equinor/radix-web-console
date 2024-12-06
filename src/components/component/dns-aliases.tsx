import { Accordion, List, Typography } from '@equinor/eds-core-react';
import type { FunctionComponent } from 'react';
import type { DnsAlias, DnsExternalAlias } from '../../store/radix-api';
import { DNSAlias } from './dns_alias';

import './style.css';

export interface DefaultAppAliasProps {
  appName: string;
  dnsAliases?: DnsAlias[] | DnsExternalAlias[];
  title: string;
}

export const DNSAliases: FunctionComponent<DefaultAppAliasProps> = ({
  appName,
  dnsAliases,
  title,
}) => (
  <>
    {dnsAliases && dnsAliases.length > 0 && (
      <div className="grid grid--gap-small">
        <Typography variant="h4">{title}</Typography>
        {dnsAliases.length == 1 ? (
          <Typography as="span">
            <DNSAlias
              appName={appName}
              url={dnsAliases[0].url}
              componentName={dnsAliases[0].componentName}
              environmentName={dnsAliases[0].environmentName}
            />
          </Typography>
        ) : (
          <Accordion className="accordion elevated" chevronPosition="right">
            <Accordion.Item isExpanded={false}>
              <Accordion.Header>
                <Accordion.HeaderTitle>
                  {dnsAliases[0].url} (and {dnsAliases.length - 1} more)
                </Accordion.HeaderTitle>
              </Accordion.Header>
              <Accordion.Panel>
                <List>
                  {dnsAliases?.map((dnsAlias, index) => (
                    <div key={index} className="o-item-list">
                      <Typography as="span">
                        <DNSAlias
                          appName={appName}
                          url={dnsAlias.url}
                          componentName={dnsAlias.componentName}
                          environmentName={dnsAlias.environmentName}
                        />
                      </Typography>
                    </div>
                  ))}
                </List>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    )}
  </>
);
