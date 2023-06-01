import { Accordion, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetEnvironmentScans } from './use-get-environment-scans';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { ComponentStatusBadge } from '../status-badges';
import { ReplicaStatusTooltip } from '../status-tooltips';
import { VulnerabilitySummary } from '../vulnerability-summary';
import {
  EnvironmentComponentScanModel,
  EnvironmentScanSummaryModel,
} from '../../models/environment-scan-summary';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/radix-api/deployments/component';
import {
  buildComponentMap,
  buildComponentTypeLabelPlural,
  ComponentType,
} from '../../models/radix-api/deployments/component-type';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/radix-api/environments/environment';
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

function getEnvironmentComponentScanModel(
  data: EnvironmentScanSummaryModel,
  name: string,
  type: ComponentType
): EnvironmentComponentScanModel {
  let componentKey = '';
  switch (type) {
    case ComponentType.component:
      componentKey = 'components';
      break;
    case ComponentType.job:
      componentKey = 'jobs';
      break;
    default:
      break;
  }

  return data && data[componentKey] ? data[componentKey][name] : null;
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
    <div className="component-replica__link-container">
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
    </div>
  ) : (
    <Typography>No active replicas</Typography>
  );

const EnvironmentComponentScanSummary = ({
  scan,
}: {
  scan: EnvironmentComponentScanModel;
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
        : ['Not scanned', 'Scan failed'][+(scan.scanSuccess === false)]}
    </Typography>
  );

export const ComponentList = ({
  appName,
  environment,
  components,
}: ComponentListProps): JSX.Element => {
  const [compMap, setCompMap] = useState<Record<string, Array<ComponentModel>>>(
    {}
  );
  useEffect(() => setCompMap(buildComponentMap(components)), [components]);

  const [environmentVulnerabilities] = useGetEnvironmentScans(
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
              <Typography variant="h4" as="span">
                Active {buildComponentTypeLabelPlural(type)}
              </Typography>
            </Accordion.Header>
            <Accordion.Panel>
              <div className="grid grid--table-overflow">
                <Table className="component-list">
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell>ID</Table.Cell>
                      <Table.Cell className="component-list-head__status">
                        Status
                      </Table.Cell>
                      <Table.Cell>Replicas</Table.Cell>
                      <Table.Cell className="component-list-head__vulnerabilities">
                        Vulnerabilities
                      </Table.Cell>
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
                            <EnvironmentComponentScanSummary
                              scan={getEnvironmentComponentScanModel(
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
