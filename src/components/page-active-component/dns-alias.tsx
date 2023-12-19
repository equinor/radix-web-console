import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  DNSAliasModel,
  DNSAliasModelValidationMap,
} from '../../models/radix-api/applications/dns-alias';
import { Icon, List, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';

export interface DNSAliasProps {
  dnsAliases?: DNSAliasModel[];
}

export const DnsAlias: FunctionComponent<DNSAliasProps> = ({ dnsAliases }) => (
  <>
    {dnsAliases && (
      <div className="grid grid--gap-x-small">
        <Typography variant="h4">
          DNS alias{dnsAliases.length > 1 ? 'es' : ''}
        </Typography>
        <List>
          {dnsAliases.map((dnsAlias, index) => (
            <div key={index} className="o-item-list">
              <Typography>
                <Icon data={link} />
                <Typography link href={`https://${dnsAlias.url}`}>
                  {dnsAlias.url}
                </Typography>
              </Typography>
            </div>
          ))}
        </List>
      </div>
    )}
  </>
);

DnsAlias.propTypes = {
  dnsAliases: PropTypes.arrayOf(
    PropTypes.shape(
      DNSAliasModelValidationMap
    ) as PropTypes.Validator<DNSAliasModel>
  ),
};
