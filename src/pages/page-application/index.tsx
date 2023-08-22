import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router';

import { DocumentTitle } from '../../components/document-title';
import { LayoutApp } from '../../components/layout-app';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export const PageApplication: FunctionComponent<{ appName: string }> = ({
  appName,
}) => (
  <LayoutApp appName={appName}>
    <DocumentTitle title={appName} />
    <div className="o-layout-constrained">
      <Outlet />
    </div>
  </LayoutApp>
);

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
};

const Component = connectRouteParams(PageApplication);
export { Component, routeParamLoader as loader };
