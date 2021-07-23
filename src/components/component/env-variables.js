import React from 'react';
import { Table } from '@equinor/eds-core-react';

const EnvVariables = ({ component, includeRadixVars }) => {
  let hasRadixVars = false;
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
      <h4>Environment variables</h4>
      {hasRadixVars && (
        <p className="body_short">(* automatically added by Radix)</p>
      )}
      {envVarNames.length === 0 && (
        <p>This component uses no environment variables</p>
      )}
      {envVarNames.length > 0 && (
        <Table className="variables_table">
          <Table.Body>{varList}</Table.Body>
        </Table>
      )}
    </React.Fragment>
  );
};

export default EnvVariables;
