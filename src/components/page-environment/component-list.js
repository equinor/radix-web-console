import { Accordion, Table, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import ComponentListItem from './component-list-item';
import ComponentItem from '../../models/component-summary';
import {
  buildComponentMap,
  buildComponentTypeLabelPluralMap,
} from '../../models/component-type';
import environmentModel from '../../models/environment';

export const ComponentList = ({ appName, environment, components }) => {
  const compMap = buildComponentMap(components);

  return Object.keys(compMap).map((componentType) => (
    <Accordion.Item
      className="accordion__item elevated"
      isExpanded
      key={componentType}
    >
      <Accordion.Header className="accordion__header">
        <Typography variant="h4">
          Active {buildComponentTypeLabelPluralMap(componentType)}
        </Typography>
      </Accordion.Header>
      <Accordion.Panel className="accordion__panel">
        <div className="grid grid--table-overflow">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>Replicas</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <ComponentListItem
                appName={appName}
                environment={environment}
                components={compMap[componentType]}
              ></ComponentListItem>
            </Table.Body>
          </Table>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  ));
};

ComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentList;
