import React, { useState } from 'react';
import { Button, Icon, Table } from '@equinor/eds-core-react';
import usePollEnvVars from './use-poll-env-vars';
import AsyncResource from '../async-resource/simple-async-resource';
import EnvironmentVariable from './env-var';

const EnvironmentVariables = (props) => {
  const { appName, envName, componentName, includeRadixVars } = props;
  const [pollEnvVarsState] = usePollEnvVars(appName, envName, componentName);
  const envVars = pollEnvVarsState.data;
  let hasRadixVars = false;
  return (
    <React.Fragment>
      <AsyncResource asyncState={pollEnvVarsState}>
        <h4>Environment variables</h4>
        {hasRadixVars && envVars != null && (
          <p className="body_short">(* automatically added by Radix)</p>
        )}
        {envVars && envVars.length === 0 && (
          <p>This component uses no environment variables</p>
        )}
        {envVars && envVars.length > 0 && (
          <Table className="variables_table">
            <Table.Body>
              {envVars &&
                envVars.map((envVar) => {
                  hasRadixVars =
                    includeRadixVars &&
                    (hasRadixVars || envVar.isRadixVariable);
                  if (!envVar.isRadixVariable) {
                    return (
                      <EnvironmentVariable
                        appName={appName}
                        envName={envName}
                        componentName={componentName}
                        includeRadixVars={includeRadixVars}
                        envVar={envVar}
                      ></EnvironmentVariable>
                    );
                  }
                })}
            </Table.Body>
          </Table>
        )}
      </AsyncResource>
    </React.Fragment>
  );
};
export default EnvironmentVariables;
