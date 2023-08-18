import { Icon, Popover, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';

import { ApplicationModel } from '../../models/servicenow-api/models/service-now-application';
import { configVariables } from '../../utils/config';

export interface ConfigurationItemPopoverProps {
  open?: boolean;
  anchorEl: HTMLElement;
  configurationItem: ApplicationModel;
}

function urlStringForCI(id: string): string {
  return configVariables.CMDB_CI_URL.replace(/{CIID}/g, encodeURIComponent(id));
}

export const ConfigurationItemPopover: FunctionComponent<
  ConfigurationItemPopoverProps
> = ({ open, anchorEl, configurationItem }) => {
  const externalUrl = urlStringForCI(configurationItem.id);

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClick={(ev) => ev.stopPropagation()}
    >
      <Popover.Content>
        {configurationItem && (
          <div className="grid grid--gap-small">
            <div>
              <Typography group="input" variant="label">
                Name
              </Typography>
              <Typography
                rel="noopener noreferrer"
                target="_blank"
                {...(!!externalUrl && { link: true, href: externalUrl })}
              >
                {configurationItem.name}{' '}
                {externalUrl && <Icon data={external_link} size={16} />}
              </Typography>
            </div>
            <div>
              <Typography group="input" variant="label">
                App ID
              </Typography>
              <Typography>{configurationItem.number || 'N/A'}</Typography>
            </div>
            <div>
              <Typography group="input" variant="label">
                Product Owner
              </Typography>
              <Typography>{configurationItem.productOwner || 'N/A'}</Typography>
            </div>
            <div>
              <Typography group="input" variant="label">
                Technical Contact Persons
              </Typography>
              <Typography>
                {configurationItem.technicalContactPersons || 'N/A'}
              </Typography>
            </div>
            <div>
              <Typography group="input" variant="label">
                Description
              </Typography>
              <Typography>{configurationItem.description || 'N/A'}</Typography>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
};
