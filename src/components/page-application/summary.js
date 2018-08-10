import React from 'react';

import Chip from '../chip';
import Panel from '../panel';
import Pods from './pods';
import Secrets from './secrets';

export const Summary = ({ app }) => (
  <section>
    <Panel>
      <div className="o-layout-columns">
        {app.spec.environments && (
          <div>
            <h3 className="o-heading-section o-heading--first">Environments</h3>
            <ul className="o-inline-list o-inline-list--spacing">
              {app.spec.environments.map(env => (
                <li key={env.name}>
                  <Chip>{env.name}</Chip>
                </li>
              ))}
            </ul>
          </div>
        )}
        {app.spec.components && (
          <div>
            <h3 className="o-heading-section o-heading--first">Components</h3>
            <ul className="o-inline-list o-inline-list--spacing">
              {app.spec.components.map(comp => (
                <li key={comp.name}>
                  <Chip>{comp.name}</Chip>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Panel>
    <div className="o-layout-columns">
      <div>
        <h2 className="o-heading-section">Pods</h2>
        <Pods app={app} />
      </div>
      <div>
        <h2 className="o-heading-section">Secrets</h2>
        <Secrets app={app} />
      </div>
    </div>
  </section>
);

export default Summary;
