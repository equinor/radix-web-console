import { Icon, Popover, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { ServiceNowApplication } from '../../models/servicenow';
import { configVariables } from '../../utils/config';

export interface ConfigurationITemPopoverProps {
  open?: boolean;
  anchorEl: HTMLElement;
  configurationItem: ServiceNowApplication;
}

function urlStringForCI({ id }: ServiceNowApplication): string {
  return configVariables.CMDB_CI_URL.replace(/{CIID}/g, encodeURIComponent(id));
}

export const ConfigurationItemPopover = ({
  open,
  anchorEl,
  configurationItem,
}: ConfigurationITemPopoverProps): JSX.Element => {
  const externalUrl = urlStringForCI(configurationItem);
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
