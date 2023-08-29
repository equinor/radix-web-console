import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router';
import { Dispatch } from 'redux';

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
import { Alert } from '../../components/alert';
import { Typography } from '@equinor/eds-core-react';

interface PageApplicationState {
  application?: ApplicationModel;
}

interface PageApplicationDispatch {
  subscribeApplication?: (appName: string) => void;
  unsubscribeApplication?: (appName: string) => void;
}

export const PageApplication: FunctionComponent<
  { appName: string } & PageApplicationState & PageApplicationDispatch
> = ({
  appName,
  application,
  subscribeApplication,
  unsubscribeApplication,
}) => {
  useEffect(() => {
    subscribeApplication?.(appName);
    return () => unsubscribeApplication?.(appName);
  }, [appName, subscribeApplication, unsubscribeApplication]);

  return (
    <LayoutApp appName={appName}>
      <DocumentTitle title={appName} />
      <div className="o-layout-constrained">
        {!application.userIsAdmin && (
          <Alert type="warning">
            <Typography>
              You have read-only access to this application.
            </Typography>
          </Alert>
        )}
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
  subscribeApplication: PropTypes.func,
  unsubscribeApplication: PropTypes.func,
};

function mapStateToProps(state: RootState): PageApplicationState {
  return { application: { ...getMemoizedApplication(state) } };
}

function mapDispatchToProps(dispatch: Dispatch): PageApplicationDispatch {
  return {
    subscribeApplication: (name) => dispatch(subscribeApplication(name)),
    unsubscribeApplication: (name) => dispatch(unsubscribeApplication(name)),
  };
}

const ConnectedPageApplication = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageApplication);

const Component = connectRouteParams(ConnectedPageApplication);
export { Component, routeParamLoader as loader };
