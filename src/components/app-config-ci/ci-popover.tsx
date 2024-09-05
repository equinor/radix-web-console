import { Icon, Popover, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { type FunctionComponent, useEffect } from 'react';

import { configVariables } from '../../utils/config';
import type { Application } from '../../store/service-now-api';

export interface ConfigurationItemPopoverProps {
  open?: boolean;
  onClose: Function;
  anchorEl: HTMLElement;
  configurationItem: Application;
}

function urlStringForCI(id: string): string {
  return configVariables.CMDB_CI_URL.replace(/{CIID}/g, encodeURIComponent(id));
}

export const ConfigurationItemPopover: FunctionComponent<
  ConfigurationItemPopoverProps
> = ({ open, onClose, anchorEl, configurationItem }) => {
  const externalUrl = urlStringForCI(configurationItem.id);

  useEffect(() => {
    const handleBodyClick = () => onClose();
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [onClose]);

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
