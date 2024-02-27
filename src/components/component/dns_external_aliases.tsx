import { Accordion, List, Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';

import { DnsExternalAlias } from '../../store/radix-api';
import { EnvironmentComponentDNSAlias } from '../component/environment_component_dns_alias';

export interface ExternalAliasesProps {
  appName: string;
  dnsExternalAliases?: DnsExternalAlias[];
}

export const DNSExternalAliases: FunctionComponent<ExternalAliasesProps> = ({
  appName,
  dnsExternalAliases,
}) => (
  <>
    {dnsExternalAliases?.length > 0 && dnsExternalAliases.length == 1 ? (
      <div className="grid grid--gap-x-small">
        <Typography variant="h4">External DNS alias</Typography>
        <Typography as="span">
          <EnvironmentComponentDNSAlias
            appName={appName}
            url={dnsExternalAliases[0].url}
            componentName={dnsExternalAliases[0].componentName}
            environmentName={dnsExternalAliases[0].environmentName}
          />
        </Typography>
      </div>
    ) : (
      <>
        <Typography className="whitespace-nowrap" variant="h4" as="span">
          DNS external aliases:
        </Typography>
        <Accordion className="accordion elevated" chevronPosition="right">
          <Accordion.Item isExpanded={false}>
            <Accordion.Header>
              <Accordion.HeaderTitle>
                <Typography className="whitespace-nowrap" as="span">
                  <EnvironmentComponentDNSAlias
                    appName={appName}
                    url={dnsExternalAliases[0].url}
                    componentName={dnsExternalAliases[0].componentName}
                    environmentName={dnsExternalAliases[0].environmentName}
                  />
                </Typography>
              </Accordion.HeaderTitle>
            </Accordion.Header>
            <Accordion.Panel>
              <List>
                {dnsExternalAliases.slice(1)?.map((dnsExternalAlias, index) => (
                  <div key={index} className="o-item-list">
                    <Typography as="span">
                      <EnvironmentComponentDNSAlias
                        appName={appName}
                        url={dnsExternalAlias.url}
                        componentName={dnsExternalAlias.componentName}
                        environmentName={dnsExternalAlias.environmentName}
                      />
                    </Typography>
                  </div>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </>
    )}
  </>
);
