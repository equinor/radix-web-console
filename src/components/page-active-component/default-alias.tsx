import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  ApplicationAliasModel,
  ApplicationAliasModelValidationMap,
} from '../../models/radix-api/applications/application-alias';

export interface DefaultAliasProps {
  appAlias?: ApplicationAliasModel;
  envName: string;
  componentName: string;
}

export const DefaultAlias: FunctionComponent<DefaultAliasProps> = ({
  appAlias,
  envName,
  componentName,
}) => (
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
  appAlias: PropTypes.shape(
    ApplicationAliasModelValidationMap
  ) as PropTypes.Validator<ApplicationAliasModel>,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};
