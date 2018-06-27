import React from 'react';

import Button from '../button';

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';

export const ApplicationsList = ({ apps, deleteApp }) => {
  return (
    <ul>
      {apps.map(app => (
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
          )}
          <div className="o-layout-toolbar">
            {!app.spec.environments && '(none)'}
            {app.spec.environments && (
              <React.Fragment>
                <span>Environments:</span>
                {app.spec.environments.map(env =>
                  app.spec.components.map(component => (
                    <a
                      target="_blank"
                      href={`https://${component.name}-${app.metadata.name}-${
                        env.name
                      }.dev.radix.equinor.com`}
                    >
                      {env.name}
                    </a>
                  ))
                )}
              </React.Fragment>
            )}
            <Button
              btnType={['tiny', 'danger']}
              onClick={() =>
                window.confirm(CONFIRM_TEXT) && deleteApp(app.metadata.name)
              }
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ApplicationsList;
