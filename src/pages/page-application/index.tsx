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

export const PageApplication: FunctionComponent<{
  application: ApplicationModel;
}> = (props) => (
  console.log('PageApplication', props),
  console.log('PageApplication name', props.application.name),
  console.log('PageApplication userIsAdmin', props.application.userIsAdmin),
  (
    <LayoutApp appName={props.application.name}>
      <DocumentTitle title={props.application.name} />
      <div className="o-layout-constrained">
        {props.application.userIsAdmin && (
          <Alert type="warning">
            <Typography>
              You have read-only access to this application.
            </Typography>
          </Alert>
        )}
        <Outlet />
      </div>
    </LayoutApp>
  )
);

PageApplication.propTypes = {
  application: PropTypes.shape(ApplicationModelValidationMap).isRequired,
};

const Component = connectRouteParams(PageApplication);
export { Component, routeParamLoader as loader };
