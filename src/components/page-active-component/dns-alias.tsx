import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  DNSAliasModel,
  DNSAliasModelValidationMap,
} from '../../models/radix-api/applications/dns-alias';

export interface DNSAliasProps {
  dnsAlias?: DNSAliasModel[];
  envName: string;
  componentName: string;
}

export const DnsAlias: FunctionComponent<DNSAliasProps> = ({
  dnsAlias,
  envName,
  componentName,
}) => (
  <>
    {dnsAlias?.length &&
      dnsAlias.map((dnsAlias, index) => {
        <Typography>
          This component is the{' '}
          <Typography
            link
            href={`https://${dnsAlias.url}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            alias <Icon data={external_link} size={16} />
          </Typography>
        </Typography>;
      })}
    ;
  </>
);

DnsAlias.propTypes = {
  dnsAlias: PropTypes.arrayOf(
    PropTypes.shape(
      DNSAliasModelValidationMap
    ) as PropTypes.Validator<DNSAliasModel>
  ),
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};
