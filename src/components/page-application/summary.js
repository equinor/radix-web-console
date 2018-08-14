import React from 'react';

import Chip from '../chip';
import Panel from '../panel';
import Pods from './pods';
import Secrets from './secrets';

export const Summary = ({ app }) => (
  <section>
    <Panel>
      <div className="o-layout-columns">
        <div>
          <h3 className="o-heading-section o-heading--first">Environments</h3>
          {!app.spec.environments && 'Loading…'}
          {app.spec.environments && (
            <ul className="o-inline-list o-inline-list--spacing">
              {app.spec.environments.map(env => (
                <li key={env.name}>
                  <Chip>{env.name}</Chip>
                </li>
              ))}
            </ul>
          )}
          <h3 className="o-heading-section">Pods</h3>
          <Pods app={app} />
        </div>
        <div>
          <h3 className="o-heading-section o-heading--first">Components</h3>
          {!app.spec.components && 'Loading…'}
          {app.spec.components && (
            <ul className="o-inline-list o-inline-list--spacing">
              {app.spec.components.map(comp => (
                <li key={comp.name}>
                  <Chip>{comp.name}</Chip>
                </li>
              ))}
            </ul>
          )}
          <h3 className="o-heading-section">Secrets</h3>
          <Secrets app={app} />
        </div>
      </div>
    </Panel>
  </section>
);

export default Summary;
