import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { EnvironmentsSummary } from '../environments-summary';
import { routes } from '../../routes';
import { useGetApplicationQuery } from '../../store/radix-api';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { routeWithParams } from '../../utils/string';

export const PageEnvironments: FunctionComponent<{ appName: string }> = ({
  appName,
}) => {
  const { data: application, ...state } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval: 15000 }
  );
  const { environments, registration } = application ?? {};

  return (
    <>
      <DocumentTitle title={`${appName} environments`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments' },
        ]}
      />

      <AsyncResource asyncState={state}>
        <EnvironmentsSummary
          appName={appName}
          envs={environments}
          repository={registration?.repository}
        />
      </AsyncResource>
    </>
  );
};

PageEnvironments.propTypes = {
  appName: PropTypes.string.isRequired,
};

const Component = connectRouteParams(PageEnvironments);
export { Component, routeParamLoader as loader };

export default PageEnvironments;
