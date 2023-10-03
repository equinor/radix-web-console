import { Table, TextField, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, FunctionComponent, ReactNode } from 'react';

import {
  EnvVarNormalizedModel,
  EnvVarNormalizedModelValidationMap,
} from '../../models/radix-api/environmentvariables/env-var';

import './style.css';

export interface FormattedEnvVar {
  value: string;
  original: EnvVarNormalizedModel;
}

export interface EnvironmentVariableTableProps {
  vars: Array<FormattedEnvVar>;
  varPrefix?: ReactNode;
  isTextfieldDisabled?: boolean;
  inEditMode?: boolean;
  showOriginal?: boolean;
  onValueChange?: (value: string, name: string) => void;
}

export const EnvironmentVariableTable: FunctionComponent<
  EnvironmentVariableTableProps
> = ({
  vars,
  varPrefix,
  isTextfieldDisabled,
  inEditMode,
  showOriginal,
  onValueChange = () => void 0,
}) => (
  <Table className="env-vars-table">
    <Table.Head className="whitespace-nowrap">
      <Table.Row>
        <Table.Cell className="env-vars-table__header-name">Name</Table.Cell>
        <Table.Cell>Value</Table.Cell>
        {showOriginal && <Table.Cell>Original</Table.Cell>}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {vars.map(({ value, original }) => (
        <Table.Row key={original.name}>
          <Table.Cell className="whitespace-nowrap">
            {varPrefix} {original.name}
          </Table.Cell>
          <Table.Cell className="env-vars-table__item-value">
            {!inEditMode ? (
              <Typography>{value}</Typography>
            ) : (
              <div className="env-vars-table__item-form-field">
                <TextField
                  id={original.name}
                  type="text"
                  value={value}
                  multiline
                  disabled={isTextfieldDisabled}
                  onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                    onValueChange(ev.target.value, original.name)
                  }
                />
              </div>
            )}
          </Table.Cell>
          {showOriginal && (
            <Table.Cell className="env-vars-table__item-value">
              {original.metadata?.radixConfigValue?.length > 0 && (
                <Typography>{original.metadata.radixConfigValue}</Typography>
              )}
            </Table.Cell>
          )}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

EnvironmentVariableTable.propTypes = {
  vars: PropTypes.arrayOf<FormattedEnvVar>(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      original: PropTypes.shape(EnvVarNormalizedModelValidationMap).isRequired,
    }) as PropTypes.Validator<FormattedEnvVar>
  ),
  varPrefix: PropTypes.node,
  inEditMode: PropTypes.bool,
  isTextfieldDisabled: PropTypes.bool,
  showOriginal: PropTypes.bool,
  onValueChange: PropTypes.func,
};
