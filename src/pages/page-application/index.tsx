import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router';

import { DocumentTitle } from '../../components/document-title';
import { LayoutApp } from '../../components/layout-app';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageApplication: FunctionComponent<{
  appName: string;
}> = ({ appName }) => (
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

export default mapRouteParamsToProps(['appName'], PageApplication);
