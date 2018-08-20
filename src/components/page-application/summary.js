import React from 'react';
import { Link } from 'react-router-dom';

import Chip from '../chip';
import Panel from '../panel';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

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
                  <Chip>
                    <Link
                      to={routeWithParams(routes.appEnvironment, {
                        id: app.metadata.name,
                        env: env.name,
                      })}
                    >
                      {env.name}
                    </Link>
                  </Chip>
                </li>
              ))}
            </ul>
          )}
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
        </div>
      </div>
    </Panel>
  </section>
);

export default Summary;
