import React from 'react';
import { Table } from '@equinor/eds-core-react';
import usePollEnvVars from './use-poll-env-vars';
import AsyncResource from '../async-resource';

const EnvironmentVariables = (props) => {
  const { appName, envName, componentName, includeRadixVars } = props;
  const [pollEnvVarsState, pollEnvVars] = usePollEnvVars(
    appName,
    envName,
    componentName
  );
  const envVars = pollEnvVarsState.data;
  let hasRadixVars = false;
  const varList =
    envVars &&
    envVars.map((envVar) => {
      let varName = envVar.name;
      hasRadixVars =
        includeRadixVars && (hasRadixVars || envVar.isRadixVariable);

      if (!envVar.isRadixVariable) {
        return (
          <Table.Row key={varName}>
            <Table.Cell>
              {varName} <strong>{envVar.value}</strong>
            </Table.Cell>
          </Table.Row>
        );
      }

      if (includeRadixVars !== true) {
        return '';
      }

      return (
        <Table.Row key={varName}>
          <Table.Cell>
            * {varName} <strong>{envVar.value}</strong>
          </Table.Cell>
        </Table.Row>
      );
    });

  return (
    <React.Fragment>
      <AsyncResource asyncState={pollEnvVarsState}>
        <h4>Environment variables</h4>
        {hasRadixVars && envVars != null && (
          <p className="body_short">(* automatically added by Radix)</p>
        )}
        }
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
                      <Table.Row key={envVar.name}>
                        <Table.Cell>
                          {envVar.name} <strong>{envVar.value}</strong>
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                  if (includeRadixVars === true) {
                    return (
                      <Table.Row key={envVar.name}>
                        <Table.Cell>
                          * {envVar.name} <strong>{envVar.value}</strong>
                        </Table.Cell>
                      </Table.Row>
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
