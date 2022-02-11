import { Accordion, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ComponentListItem } from './component-list-item';
import componentModel from '../../models/component';
import {
  buildComponentMap,
  buildComponentTypeLabelPluralMap,
} from '../../models/component-type';
import environmentModel from '../../models/environment';

export const ComponentList = ({ appName, environment, components }) => {
  const [compMap, setCompMap] = useState({});
  useEffect(() => setCompMap(buildComponentMap(components)), [components]);

  return (
    <>
      {Object.keys(compMap).map((componentType) => (
        <Accordion.Item
          className="accordion elevated"
          isExpanded
          key={componentType}
        >
          <Accordion.Header>
            <Typography variant="h4">
              Active {buildComponentTypeLabelPluralMap(componentType)}
            </Typography>
          </Accordion.Header>
          <Accordion.Panel>
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
      ))}
    </>
  );
};

ComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
  components: PropTypes.arrayOf(PropTypes.shape(componentModel)).isRequired,
};

export default ComponentList;
