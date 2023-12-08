import { Icon, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  DNSAliasModel,
  DNSAliasModelValidationMap,
} from '../../models/radix-api/applications/dns-alias';

export interface DNSAliasProps {
  dnsAliases?: DNSAliasModel[];
}

export const DnsAlias: FunctionComponent<DNSAliasProps> = ({ dnsAliases }) => (
  <>
    {dnsAliases?.length > 0 &&
      dnsAliases.map((dnsAlias, index) => {
        <div key={index} className="grid grid--gap-small">
          <h1>asdasdsa</h1>
          <Typography>
            <Icon data={link} />
            <Typography link href={`https://${dnsAlias.url}`}>
              {dnsAlias.url}
            </Typography>{' '}
            is mapped to this component
          </Typography>
        </div>;
      })}
  </>
);

DnsAlias.propTypes = {
  dnsAliases: PropTypes.arrayOf(
    PropTypes.shape(
      DNSAliasModelValidationMap
    ) as PropTypes.Validator<DNSAliasModel>
  ),
};
