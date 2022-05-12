import { Accordion, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetEnvironmentVulnerabilities } from './use-get-environment-vulnerabilities';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { ComponentStatusBadge } from '../status-badges';
import { ReplicaStatusTooltip } from '../status-tooltips';
import { VulnerabilitySummary } from '../vulnerability-summary';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import {
  buildComponentMap,
  buildComponentTypeLabelPlural,
  ComponentType,
} from '../../models/component-type';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/environment';
import {
  ComponentScanModel,
  EnvironmentScanSummaryModel,
} from '../../models/environment-scan-summary';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
  getReplicaUrl,
} from '../../utils/routing';
import { smallReplicaName } from '../../utils/string';

import './style.css';

export interface ComponentListProps {
  appName: string;
  environment?: EnvironmentModel;
  components: Array<ComponentModel>;
}

function getComponentUrl(
  appName: string,
  environment: EnvironmentModel,
  component: ComponentModel
): string {
  return component.type === ComponentType.job
    ? getActiveJobComponentUrl(appName, environment.name, component.name)
    : getActiveComponentUrl(appName, environment.name, component.name);
}

function getComponentScanModel(
  data: EnvironmentScanSummaryModel,
  name: string,
  type: ComponentType
): ComponentScanModel {
  const compData =
    data && data[type === ComponentType.component ? 'components' : 'jobs'];
  return compData && compData[name];
}

const ReplicaLinks = ({
  appName,
  envName,
  componentName,
  replicaList,
}: {
  appName: string;
  envName: string;
  componentName: string;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
}): JSX.Element =>
  replicaList?.length > 0 ? (
    <span className="grid grid--auto-columns grid--gap-small">
      {replicaList.map((x, i) => (
        <Link
          key={i}
          className="component-replica__link"
          to={getReplicaUrl(appName, envName, componentName, x.name)}
        >
          <ReplicaStatusTooltip status={x.status} />{' '}
          <Typography link as="span">
            {smallReplicaName(x.name)}
          </Typography>
        </Link>
      ))}
    </span>
  ) : (
    <Typography>No active replicas</Typography>
  );

const ComponentScanSummary = ({
  scan,
}: {
  scan: ComponentScanModel;
}): JSX.Element =>
  scan?.scanSuccess ? (
    <VulnerabilitySummary summary={scan?.vulnerabilitySummary} />
  ) : (
    <Typography
      group="table"
      variant="cell_text"
      {...(scan?.scanSuccess === false && { color: 'warning' })}
    >
      {!scan
        ? 'No data'
        : scan.scanSuccess === false
        ? 'Scan failed'
        : 'Not scanned'}
    </Typography>
  );

export const ComponentList = ({
  appName,
  environment,
  components,
}: ComponentListProps): JSX.Element => {
  const [compMap, setCompMap] = useState<{
    [key: string]: Array<ComponentModel>;
  }>({});
  useEffect(() => setCompMap(buildComponentMap(components)), [components]);

  const [environmentVulnerabilities] = useGetEnvironmentVulnerabilities(
    appName,
    environment.name
  );

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
                      <Table.Cell>Vulnerabilities</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {compMap[type].map((x, i) => (
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Link to={getComponentUrl(appName, environment, x)}>
                            <Typography link as="span">
                              {x.name}
                            </Typography>
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <ComponentStatusBadge status={x.status} />
                        </Table.Cell>
                        <Table.Cell>
                          <ReplicaLinks
                            appName={appName}
                            envName={environment.name}
                            componentName={x.name}
                            replicaList={x.replicaList}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <SimpleAsyncResource
                            asyncState={environmentVulnerabilities}
                            customError={
                              <samp>{environmentVulnerabilities.error}</samp>
                            }
                          >
                            <ComponentScanSummary
                              scan={getComponentScanModel(
                                environmentVulnerabilities.data,
                                x.name,
                                x.type
                              )}
                            />
                          </SimpleAsyncResource>
                        </Table.Cell>
                      </Table.Row>
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
