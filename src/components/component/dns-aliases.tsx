import { Accordion, List, Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';
import { DnsAlias } from '../../store/radix-api';
import { EnvironmentComponentDNSAlias } from '../component/environment_component_dns_alias';

export interface DefaultAppAliasProps {
  appName: string;
  dnsAliases?: DnsAlias[];
}

export const DnsAliases: FunctionComponent<DefaultAppAliasProps> = ({
  appName,
  dnsAliases,
}) => (
  <>
    {dnsAliases?.length > 0 && dnsAliases.length == 1 ? (
      <div className="grid grid--gap-x-small">
        <Typography variant="h4">DNS alias</Typography>
        <Typography as="span">
          <EnvironmentComponentDNSAlias
            appName={appName}
            url={dnsAliases[0].url}
            componentName={dnsAliases[0].componentName}
            environmentName={dnsAliases[0].environmentName}
          />
        </Typography>
      </div>
    ) : (
      <>
        <Typography className="whitespace-nowrap" variant="h4" as="span">
          DNS aliases:
        </Typography>
        <Accordion className="accordion elevated" chevronPosition="right">
          <Accordion.Item isExpanded={false}>
            <Accordion.Header>
              <Accordion.HeaderTitle>
                <Typography className="whitespace-nowrap" as="span">
                  <EnvironmentComponentDNSAlias
                    appName={appName}
                    url={dnsAliases[0].url}
                    componentName={dnsAliases[0].componentName}
                    environmentName={dnsAliases[0].environmentName}
                  />
                </Typography>
              </Accordion.HeaderTitle>
            </Accordion.Header>
            <Accordion.Panel>
              <List>
                {dnsAliases.slice(1)?.map((dnsAlias, index) => (
                  <div key={index} className="o-item-list">
                    <Typography as="span">
                      <EnvironmentComponentDNSAlias
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
      </>
    )}
  </>
);
