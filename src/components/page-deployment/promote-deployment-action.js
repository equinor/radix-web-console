import deploymentModel from '../../models/deployment';
import PropTypes from 'prop-types';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';
import ActionsPage from '../actions-page';
import LinkButton from '../link-button';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import React from 'react';

const PromoteDeploymentAction = ({ appName, deploymentName, deployment }) => {
  return (
    <span>
      {deployment &&
        configHandler.getConfig(configKeys.FLAGS).enablePromotionPipeline && (
          <ActionsPage>
            <LinkButton
              to={routeWithParams(
                routes.appJobNew,
                { appName },
                {
                  pipeline: 'promote',
                  deploymentName: deploymentName,
                  fromEnvironment: deployment.environment,
                }
              )}
            >
              Promote deployment…
            </LinkButton>
          </ActionsPage>
        )}
    </span>
  );
};

PromoteDeploymentAction.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  deployment: PropTypes.exact(deploymentModel),
};

export default PromoteDeploymentAction;
