import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router';

import { Alert } from '../../components/alert';
import AsyncResource from '../../components/async-resource';
import { DocumentTitle } from '../../components/document-title';
import { LayoutApp } from '../../components/layout-app';
import { RootState } from '../../init/store';
import {
  ApplicationModel,
  ApplicationModelValidationMap,
} from '../../models/radix-api/applications/application';
import { getMemoizedApplication } from '../../state/application';
import {
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

interface PageApplicationState {
  application?: ApplicationModel;
}

interface PageApplicationDispatch {
  subscribeApp?: (appName: string) => void;
  unsubscribeApp?: (appName: string) => void;
}

export interface PageApplicationProps
  extends PageApplicationState,
    PageApplicationDispatch {
  appName: string;
}

export const PageApplication: FunctionComponent<PageApplicationProps> = ({
  appName,
  application,
  subscribeApp,
  unsubscribeApp,
}) => {
  useEffect(() => {
    subscribeApp?.(appName);
    return () => unsubscribeApp?.(appName);
  }, [appName, subscribeApp, unsubscribeApp]);

  return (
    <LayoutApp appName={appName}>
      <DocumentTitle title={appName} />

      <div className="o-layout-constrained">
        <AsyncResource
          resource="APP"
          resourceParams={[appName]}
          loadingContent={false}
        >
          {!application?.userIsAdmin && (
            <Alert type="warning">
              <Typography>
                You have read-only access to this application.
              </Typography>
            </Alert>
          )}
        </AsyncResource>

        <Outlet />
      </div>
    </LayoutApp>
  );
};

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
  application: PropTypes.shape(
    ApplicationModelValidationMap
  ) as PropTypes.Validator<ApplicationModel>,
  subscribeApp: PropTypes.func,
  unsubscribeApp: PropTypes.func,
};

const ConnectedPageApplication = connect<
  PageApplicationState,
  PageApplicationDispatch
>(
  (state: RootState) => ({ application: { ...getMemoizedApplication(state) } }),
  (dispatch) => ({
    subscribeApp: (app) => dispatch(subscribeApplication(app)),
    unsubscribeApp: (app) => dispatch(unsubscribeApplication(app)),
  })
)(PageApplication);

const Component = connectRouteParams(ConnectedPageApplication);
export { Component, routeParamLoader as loader };

export default ConnectedPageApplication;
