import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import {
  ApplicationAliasModel,
  ApplicationAliasModelValidationMap,
} from '../../models/radix-api/applications/application-alias';

export interface DefaultAliasProps {
  appAlias?: ApplicationAliasModel;
  envName: string;
  componentName: string;
}

export const DefaultAlias = ({
  appAlias,
  envName,
  componentName,
}: DefaultAliasProps): React.JSX.Element => (
  <>
    {appAlias &&
      appAlias.componentName === componentName &&
      appAlias.environmentName === envName && (
        <Typography>
          This component is the{' '}
          <Typography
            link
            href={`https://${appAlias.url}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            default alias <Icon data={external_link} size={16} />
          </Typography>
        </Typography>
      )}
  </>
);

DefaultAlias.propTypes = {
  appAlias: PropTypes.shape(ApplicationAliasModelValidationMap),
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<DefaultAliasProps>;
