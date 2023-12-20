import { Divider, Typography } from '@equinor/eds-core-react';
import { Server } from 'miragejs';
import { Fragment } from 'react';

import { SecretOverview } from './secret-overview';

import {
  ChangeComponentSecretApiResponse,
  GetEnvironmentApiArg,
  GetEnvironmentApiResponse,
} from '../../../store/radix-api';

const testData: Array<GetEnvironmentApiResponse> = [
  {
    name: 'env1',
    activeDeployment: { namespace: 'any', repository: 'any' },
    secrets: [
      { name: 'secret_1', status: 'Consistent', component: 'component_1' },
      { name: 'secret_2', status: 'Pending', component: 'component_2' },
    ],
  },
  {
    name: 'env2',
    activeDeployment: { namespace: 'any', repository: 'any' },
    secrets: [
      { name: 'pandora', status: 'Pending', component: 'component_1' },
      { name: 'ellipsis', status: 'NotAvailable', component: 'component_2' },
    ],
  },
];

// Mock API response
new Server({
  routes() {
    // Mock response for GetEnvironment
    this.get(
      '/api/v1/applications/:appName/environments/:envName',
      (_, request): GetEnvironmentApiResponse =>
        testData.find(
          ({ name }) =>
            name === (request.params as GetEnvironmentApiArg).envName
        )
    );

    // Mock response for ChangeComponentSecret
    this.put(
      '/api/v1/applications/:appName/environments/:envName/components/:componentName/secrets/:secretName',
      (): ChangeComponentSecretApiResponse => void 0
    );
  },
});

export default (
  <div
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    {testData.map(({ name, secrets }, i) => (
      <Fragment key={i}>
        <Typography variant="h1_bold">TestData "{name}"</Typography>
        <div className="o-layout-constrained" style={{ margin: 'auto' }}>
          {secrets.map(({ name: secretName, component }, j) => (
            <SecretOverview
              key={j}
              appName={`testData ${i}`}
              envName={name}
              componentName={component}
              secretName={secretName}
            />
          ))}
        </div>
        {[...Array(3)].map((_, j) => (
          <Divider key={j} />
        ))}
      </Fragment>
    ))}
  </div>
);
