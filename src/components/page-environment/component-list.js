import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import {
  buildComponentMap,
  buildComponentTypeLabelPluralMap,
} from '../../models/component-type';
import environmentModel from '../../models/environment';
import ComponentListItem from './component-list-item';
import { Accordion, Table } from '@equinor/eds-core-react';

export const ComponentList = ({ appName, environment, components }) => {
  const compMap = buildComponentMap(components);

  return Object.keys(compMap).map((componentType) => (
    <Accordion.Item
      className="accordion__item elevated"
      isExpanded
      key={componentType}
    >
      <Accordion.Header className="accordion__header">
        <h4>Active {buildComponentTypeLabelPluralMap(componentType)}</h4>
      </Accordion.Header>
      <Accordion.Panel className="accordion__panel">
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
