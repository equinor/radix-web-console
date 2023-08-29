import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router';

import { DocumentTitle } from '../../components/document-title';
import { LayoutApp } from '../../components/layout-app';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { Alert } from '../../components/alert';
import { Typography } from '@equinor/eds-core-react';

import {
  ApplicationModel,
  ApplicationModelValidationMap,
} from '../../models/radix-api/applications/application';

export interface PageApplicationProps {
  appName: string;
  application: ApplicationModel;
}
export const PageApplication: FunctionComponent<PageApplicationProps> = ({
  appName,
  application,
}) => (
  <LayoutApp appName={appName}>
    <DocumentTitle title={appName} />
    <div className="o-layout-constrained">
      {application.userIsAdmin && (
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

PageApplication.propTypes = {
  application: PropTypes.shape(ApplicationModelValidationMap)
    .isRequired as PropTypes.Validator<ApplicationModel>,
  appName: PropTypes.string.isRequired,
};

const Component = connectRouteParams(PageApplication);
export { Component, routeParamLoader as loader };
