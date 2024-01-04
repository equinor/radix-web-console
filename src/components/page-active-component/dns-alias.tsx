import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Icon, List, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { DnsAlias as DnsAliasModel } from '../../store/radix-api';

export interface DNSAliasProps {
  dnsAliases?: DnsAliasModel[];
}

export const DnsAlias: FunctionComponent<DNSAliasProps> = ({ dnsAliases }) => (
  <>
    {dnsAliases && (
      <div className="grid grid--gap-x-small">
        <Typography>DNS alias{dnsAliases.length > 1 ? 'es' : ''}</Typography>
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
    PropTypes.object as PropTypes.Validator<DnsAliasModel>
  ).isRequired,
};
