import { Popover, Typography } from '@equinor/eds-core-react';
import { useEffect } from 'react';

import type { Application } from '../../store/service-now-api';
import { configVariables } from '../../utils/config';
import { ExternalLink } from '../link/external-link';

export interface ConfigurationItemPopoverProps {
  open: boolean;
  onClose: () => unknown;
  anchorEl?: HTMLElement;
  configurationItem: Application;
}

function urlStringForCI(id: string): string {
  return configVariables.CMDB_CI_URL.replace(/{CIID}/g, encodeURIComponent(id));
}

export const ConfigurationItemPopover = ({
  open,
  onClose,
  anchorEl,
  configurationItem,
}: ConfigurationItemPopoverProps) => {
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
              <ExternalLink href={externalUrl}>
                {configurationItem.name}
              </ExternalLink>
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
