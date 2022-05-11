import { Accordion, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ComponentListItemRow } from './component-list-item';

import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import {
  buildComponentMap,
  buildComponentTypeLabelPlural,
} from '../../models/component-type';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/environment';

import './style.css';

export interface ComponentListProps {
  appName: string;
  environment?: EnvironmentModel;
  components: Array<ComponentModel>;
}

export const ComponentList = ({
  appName,
  environment,
  components,
}: ComponentListProps): JSX.Element => {
  const [compMap, setCompMap] = useState<{
    [key: string]: Array<ComponentModel>;
  }>({});
  useEffect(() => setCompMap(buildComponentMap(components)), [components]);

  return (
    <>
      {Object.keys(compMap).map((type) => (
        <Accordion
          className="accordion elevated"
          chevronPosition="right"
          key={type}
        >
          <Accordion.Item isExpanded>
            <Accordion.Header>
              <Typography variant="h4">
                Active {buildComponentTypeLabelPlural(type)}
              </Typography>
            </Accordion.Header>
            <Accordion.Panel>
              <div className="grid grid--table-overflow">
                <Table className="component-list">
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>ID</Table.Cell>
                      <Table.Cell>Status</Table.Cell>
                      <Table.Cell>Replicas</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {compMap[type].map((x, i) => (
                      <ComponentListItemRow
                        key={i}
                        appName={appName}
                        environment={environment}
                        component={x}
                      />
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
};

ComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(EnvironmentModelValidationMap),
  components: PropTypes.arrayOf(PropTypes.shape(ComponentModelValidationMap))
    .isRequired,
} as PropTypes.ValidationMap<ComponentListProps>;
