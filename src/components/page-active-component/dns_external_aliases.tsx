import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Icon, List, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { ExternalDns } from '../../store/radix-api';

export interface ExternalAliasProps {
  dnsExternalAliases?: ExternalDns[];
}

export const DNSExternalAlias: FunctionComponent<ExternalAliasProps> = ({
  dnsExternalAliases,
}) => (
  <>
    {dnsExternalAliases && (
      <div className="grid grid--gap-x-small">
        <Typography>
          External DNS alias{dnsExternalAliases.length > 1 ? 'es' : ''}
        </Typography>
        <List>
          {dnsExternalAliases.map((dnsExternalAlias, index) => (
            <div key={index} className="o-item-list">
              <Typography>
                <Typography link href={`https://${dnsExternalAlias.fqdn}`}>
                  {dnsExternalAlias.fqdn}{' '}
                  <Icon data={external_link} size={16} />
                </Typography>
              </Typography>
            </div>
          ))}
        </List>
      </div>
    )}
  </>
);

DNSExternalAlias.propTypes = {
  dnsExternalAliases: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ExternalDns>
  ).isRequired,
};
