import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Outlet } from 'react-router';
import { withRouteParams } from '../../utils/router';

import { Alert } from '../../components/alert';
import { DocumentTitle } from '../../components/document-title';
import { LayoutApp } from '../../components/layout-app';
import { useGetApplicationQuery } from '../../store/radix-api';

export function PageApplication({ appName }: { appName: string }) {
  const { data: application, isSuccess } = useGetApplicationQuery({ appName });

  return (
    <LayoutApp appName={appName}>
      <DocumentTitle title={appName} />

      <div className="o-layout-constrained">
        {isSuccess && !application?.userIsAdmin && (
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
}

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default withRouteParams(PageApplication);
