import React from 'react';
import { Table, Typography } from '@equinor/eds-core-react';
import { ReactComponent as Logo } from './radix-logo.svg';
import { componentType } from '../../models/component-type';

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
          <Logo height="24px" />
          {varName}{' '}
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
            ( <Logo height="24px" width="24px" /> automatically added by Radix )
          </Typography>
        )}
      </div>
      {envVarNames.length === 0 ||
      (!includeRadixVars && envVarNames.length - radixVarNames === 0) ? (
        <Typography variant="body_short">
          This {component.type === componentType.job ? 'job' : 'component'} uses
          no environment variables
        </Typography>
      ) : (
        <div className="grid grid--table-overflow">
          <Table className="variables_table">
            <Table.Body>{varList}</Table.Body>
          </Table>
        </div>
      )}
    </React.Fragment>
  );
};

export default EnvVariables;
