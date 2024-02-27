import { Accordion, List, Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';
import { DnsAlias, DnsExternalAlias } from '../../store/radix-api';
import { DNSAlias } from './dns_alias';

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
    {dnsAliases?.length > 0 &&
      (dnsAliases.length == 1 ? (
        <div className="grid grid--gap-x-small">
          <Typography variant="h4">{title}</Typography>
          <Typography as="span">
            <DNSAlias
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
            {title}
          </Typography>
          <Accordion className="accordion elevated" chevronPosition="right">
            <Accordion.Item isExpanded={false}>
              <Accordion.Header>
                <Accordion.HeaderTitle>
                  <Typography className="whitespace-nowrap" as="span">
                    <DNSAlias
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
        </>
      ))}
  </>
);
