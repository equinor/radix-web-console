import { Accordion, List, Typography } from '@equinor/eds-core-react';
import { FunctionComponent } from 'react';
import { DNSAlias } from './dns-alias';

export interface DefaultAppAliasProps {
  urls?: string[];
  title: string;
}

export const DNSAliases: FunctionComponent<DefaultAppAliasProps> = ({
  urls,
  title,
}) => (
  <>
    {urls.length > 0 && urls.length == 1 ? (
      <div className="grid grid--gap-x-small">
        <Typography variant="h4">{title}</Typography>
        <Typography as="span">
          <DNSAlias url={urls[0]} />
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
                  <DNSAlias url={urls[0]} />
                </Typography>
              </Accordion.HeaderTitle>
            </Accordion.Header>
            <Accordion.Panel>
              <List>
                {urls.slice(1)?.map((url, index) => (
                  <div key={index} className="o-item-list">
                    <Typography as="span">
                      <DNSAlias url={url} />
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
