import React from 'react';
import sortBy from 'lodash/sortBy';

import Button from '../button';

const clusterDomain = require('../../config.json').clusterDomain;

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';

export const ApplicationsList = ({ apps, deleteApp }) => {
  return (
    <ul>
      {sortBy(apps, ['metadata.name']).map(app => (
        <li key={app.metadata.name}>
          {app.metadata.name}{' '}
          {app.kind === 'RadixRegistration' && '(Not yet processed)'}
          {app.kind === 'RadixApplication' && (
            <span>
              (
              {app.buildStatus}
              {app.buildTimestamp &&
                ` @ ${new Date(app.buildTimestamp).toLocaleString()}`}
              )
            </span>
          )}{' '}
          <Button
            btnType={['tiny', 'danger']}
            onClick={() =>
              window.confirm(CONFIRM_TEXT) && deleteApp(app.metadata.name)
            }
          >
            Delete
          </Button>
          {app.spec.environments &&
            app.spec.environments.map(env => (
              <div className="o-layout-toolbar" key={env.name}>
                <strong>{env.name}:</strong>
                {app.spec.components.map(component => (
                  <a
                    key={`${env.name}${component.name}`}
                    target="_blank"
                    href={`https://${component.name}-${app.metadata.name}-${
                      env.name
                    }.${clusterDomain}`}
                  >
                    <span>{component.name}</span>
                  </a>
                ))}
              </div>
            ))}
        </li>
      ))}
    </ul>
  );
};

export default ApplicationsList;
