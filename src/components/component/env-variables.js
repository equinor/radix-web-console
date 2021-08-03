import React from 'react';
import { Table, Typography } from '@equinor/eds-core-react';

const EnvVariables = ({ component, includeRadixVars }) => {
  let hasRadixVars = false;
  let radixVarNames = 0;
  const envVarNames = component && Object.keys(component.variables);

  const varList = envVarNames.map((varName) => {
    const isRadixVar = varName.slice(0, 6) === 'RADIX_';
    hasRadixVars = includeRadixVars && (hasRadixVars || isRadixVar);

    if (!isRadixVar) {
      return (
        <Table.Row key={varName}>
          <Table.Cell>
            {varName}{' '}
            <strong>{(component && component.variables)[varName]}</strong>
          </Table.Cell>
        </Table.Row>
      );
    } else {
      radixVarNames++;
    }

    if (includeRadixVars !== true) {
      return null;
    }

    return (
      <Table.Row key={varName}>
        <Table.Cell>
          * {varName}{' '}
          <strong>{(component && component.variables)[varName]}</strong>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <React.Fragment>
      <div className="env-var--header">
        <Typography variant="h4">Environment variables</Typography>{' '}
        {hasRadixVars && (
          <Typography variant="body_short">
            (* automatically added by Radix)
          </Typography>
        )}
      </div>
      {envVarNames.length === 0 ||
      (!includeRadixVars && envVarNames.length - radixVarNames === 0) ? (
        <Typography variant="body_short">
          This {component.type === 'job' ? 'job' : 'component'} uses no
          environment variables
        </Typography>
      ) : (
        <Table className="variables_table">
          <Table.Body>{varList}</Table.Body>
        </Table>
      )}
    </React.Fragment>
  );
};

export default EnvVariables;
