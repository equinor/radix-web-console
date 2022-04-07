import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

export interface DefaultAliasProps {
  appAlias: {
    componentName: string;
    environmentName: string;
    url: string;
  };
  envName: string;
  componentName: string;
}

export const DefaultAlias = ({
  appAlias,
  envName,
  componentName,
}: DefaultAliasProps): JSX.Element => (
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
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<DefaultAliasProps>;
