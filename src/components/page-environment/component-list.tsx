import { Accordion, Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AsyncResource, {
  getErrorData,
} from '../async-resource/another-async-resource';
import { ComponentStatusBadge } from '../status-badges';
import { ReplicaStatusTooltip } from '../status-tooltips';
import { VulnerabilitySummary } from '../vulnerability-summary';
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
  EnvironmentVulnerabilities,
  ImageWithLastScan,
  useGetEnvironmentVulnerabilitySummaryQuery,
} from '../../store/scan-api';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
  getReplicaUrl,
} from '../../utils/routing';
import { smallReplicaName } from '../../utils/string';

import './style.css';

export interface ComponentListProps {
  appName: string;
  environment: EnvironmentModel;
  components: Array<ComponentModel>;
}

function getComponentUrl(
  appName: string,
  envName: string,
  { name, type }: ComponentModel
): string {
  return type === ComponentType.job
    ? getActiveJobComponentUrl(appName, envName, name)
    : getActiveComponentUrl(appName, envName, name);
}

function getEnvironmentComponentScanModel(
  data: EnvironmentVulnerabilities,
  name: string,
  type: ComponentType
): ImageWithLastScan {
  let componentKey = '' as keyof EnvironmentVulnerabilities;
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

  return data?.[componentKey]?.[name];
}

const ReplicaLinks: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
}> = ({ appName, envName, componentName, replicaList }) =>
  replicaList?.length > 0 ? (
    <div className="component-replica__link-container">
      {replicaList.map((x, i) => (
        <Typography
          key={i}
          className="component-replica__link"
          as={Link}
          to={getReplicaUrl(appName, envName, componentName, x.name)}
          link
        >
          <ReplicaStatusTooltip status={x.status} />
          {smallReplicaName(x.name)}
        </Typography>
      ))}
    </div>
  ) : (
    <Typography>No active replicas</Typography>
  );

const EnvironmentComponentScanSummary: FunctionComponent<{
  scan?: ImageWithLastScan;
}> = ({ scan }) =>
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

export const ComponentList: FunctionComponent<ComponentListProps> = ({
  appName,
  environment: { name: envName },
  components,
}) => {
  // const [environmentVulnerabilities] = useGetEnvironmentScans(appName, envName);
  const { data: vulnerabilities, ...vulnerabilitiesState } =
    useGetEnvironmentVulnerabilitySummaryQuery({ appName, envName });

  const [compMap, setCompMap] = useState<Record<string, Array<ComponentModel>>>(
    {}
  );
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
              <Accordion.HeaderTitle>
                <Typography variant="h4" as="span">
                  Active {buildComponentTypeLabelPlural(type)}
                </Typography>
              </Accordion.HeaderTitle>
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
                          <Typography
                            as={Link}
                            to={getComponentUrl(appName, envName, x)}
                            link
                          >
                            {x.name}
                          </Typography>
                        </Table.Cell>
                        <Table.Cell>
                          <ComponentStatusBadge status={x.status} />
                        </Table.Cell>
                        <Table.Cell>
                          <ReplicaLinks
                            appName={appName}
                            envName={envName}
                            componentName={x.name}
                            replicaList={x.replicaList}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <AsyncResource
                            asyncState={vulnerabilitiesState}
                            errorContent={
                              <samp>
                                {vulnerabilitiesState.error &&
                                  `${(({ code }) => code && `${code}: `)(
                                    getErrorData(vulnerabilitiesState.error)
                                  )} request failed`}
                              </samp>
                            }
                          >
                            <EnvironmentComponentScanSummary
                              scan={getEnvironmentComponentScanModel(
                                vulnerabilities,
                                x.name,
                                x.type
                              )}
                            />
                          </AsyncResource>
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
  environment: PropTypes.shape(EnvironmentModelValidationMap)
    .isRequired as PropTypes.Validator<EnvironmentModel>,
  components: PropTypes.arrayOf(
    PropTypes.shape(
      ComponentModelValidationMap
    ) as PropTypes.Validator<ComponentModel>
  ).isRequired,
};
