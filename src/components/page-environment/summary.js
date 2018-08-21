import React from 'react';

import Components from './components';
import Panel from '../panel';
import Pods from './pods';
import Secrets from './secrets';

export const Summary = ({ app, env }) => (
  <section>
    <h3 className="o-heading-page">Environment: {env}</h3>
    <Panel>
      <div className="o-layout-columns">
        <div>
          <h3 className="o-heading-section o-heading--first">Components</h3>
          <Components
            appName={app.metadata.name}
            env={env}
            components={app.spec.components}
          />
          <h3 className="o-heading-section o-heading">Pods</h3>
          <Pods app={app} env={env} />
        </div>
        <div>
          <h3 className="o-heading-section o-heading--first">Secrets</h3>
          <Secrets app={app} env={env} />
        </div>
      </div>
    </Panel>
  </section>
);

export default Summary;
