import React from 'react';

import LinkButton from '../link-button';

import { keys as configKeys } from '../../utils/config/keys';
import configHandler from '../../utils/config';

const getUrlConfigValues = () =>
  configHandler
    .getDomainConfigValuesViaUrl()
    .map(c => `${c.key} = ${c.value}`)
    .join(', ');

export const ConfigStatus = () => {
  const location = window.location;
  const cleanUrl = location.protocol + '//' + location.host + location.pathname;
  const clusterType = configHandler.getConfig(configKeys.RADIX_CLUSTER_TYPE);

  return (
    <React.Fragment>
      {configHandler.hasDomainConfigViaUrl() && (
        <div className="page-root__warning">
          <strong>Config via URL</strong>: {getUrlConfigValues()}{' '}
          <LinkButton btnType={['default', 'tiny']} to={cleanUrl}>
            Reset
          </LinkButton>
        </div>
      )}
      {clusterType === 'playground' && (
        <div className="page-root__info">
          This is the Playground cluster; it is less stable than Production.
          Want to move to Production?{' '}
          <a href="https://equinor.slack.com/messages/C8U7XGGAJ">Talk to us</a>
        </div>
      )}
    </React.Fragment>
  );
};

export default ConfigStatus;
