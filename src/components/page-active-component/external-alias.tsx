import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Icon, List, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { ExternalDns } from '../../store/radix-api';

export interface ExternalAliasProps {
  externalAliases?: ExternalDns[];
}

export const ExternalAlias: FunctionComponent<ExternalAliasProps> = ({
  externalAliases,
}) => (
  <>
    {externalAliases && (
      <div className="grid grid--gap-x-small">
        <Typography>
          External DNS alias{externalAliases.length > 1 ? 'es' : ''}
        </Typography>
        <List>
          {externalAliases.map((externalAlias, index) => (
            <div key={index} className="o-item-list">
              <Typography>
                <Icon data={link} />
                <Typography link href={`https://${externalAlias.fqdn}`}>
                  {externalAlias.fqdn}
                </Typography>
              </Typography>
            </div>
          ))}
        </List>
      </div>
    )}
  </>
);

ExternalAlias.propTypes = {
  externalAliases: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<ExternalDns>
  ).isRequired,
};
