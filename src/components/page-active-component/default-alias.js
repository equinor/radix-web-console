import React from 'react';
import { Icon, Typography } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import PropTypes from 'prop-types';

const DefaultAlias = (props) => {
  const { appAlias, envName, componentName } = props;
  const isDefaultAlias =
    appAlias &&
    appAlias.componentName === componentName &&
    appAlias.environmentName === envName;
  return (
    <React.Fragment>
      {isDefaultAlias && (
        <Typography>
          This component is the{' '}
          <Typography
            link
            href={`https://${appAlias.url}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            default alias <Icon data={external_link} size="16" />
          </Typography>
        </Typography>
      )}
    </React.Fragment>
  );
};

DefaultAlias.propTypes = {
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export default DefaultAlias;
