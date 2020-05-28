import React from 'react';

import LinkButton from '../link-button';

import { keys as configKeys } from '../../utils/config/keys';
import configHandler from '../../utils/config';
import externalUrls from '../../externalUrls';

const getUrlConfigValues = () =>
  configHandler
    .getDomainConfigValuesViaUrl()
    .map((c) => `${c.key} = ${c.value}`)
    .join(', ');

export const ConfigStatus = () => {
  const location = window.location;
  const cleanUrl = location.protocol + '//' + location.host + location.pathname;
  const clusterType = configHandler.getConfig(configKeys.RADIX_CLUSTER_TYPE);
  const clusterBase = configHandler.getConfig(configKeys.RADIX_CLUSTER_BASE);

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
      {clusterBase === 'us.radix.equinor.com' && (
        <div className="page-root__danger">
          <strong>Please note!</strong> This cluster is currently in a "Proof of
          Concept (PoC)" state. It will be decided during January 2020 if the
          cluster should be supported by Radix.{' '}
          <a href={externalUrls.radixClusters}>More info.</a>
        </div>
      )}
      {clusterType === 'playground' && (
        <div className="page-root__info">
          This is the Playground cluster; it is less stable than Production.
          Want to move to Production?{' '}
          <a href={externalUrls.slackRadix}>Talk to us</a>
        </div>
      )}
    </React.Fragment>
  );
};

export default ConfigStatus;
