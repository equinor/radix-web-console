import { Accordion, Icon, Table, Typography } from '@equinor/eds-core-react';
import { upperFirst } from 'lodash-es';
import * as PropTypes from 'prop-types';
import {
  Fragment,
  type FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';

import { chevron_down, chevron_up, security } from '@equinor/eds-icons';
import clsx from 'clsx';
import type {
  Component,
  Environment,
  OAuth2AuxiliaryResource,
  ReplicaSummary,
} from '../../store/radix-api';
import {
  type EnvironmentVulnerabilities,
  type ImageWithLastScan,
  scanApi,
} from '../../store/scan-api';
import { getFetchErrorData } from '../../store/utils';
import { buildComponentMap } from '../../utils/build-component-map';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
  getOAuthReplicaUrl,
  getReplicaUrl,
} from '../../utils/routing';
import { smallReplicaName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { ComponentStatusBadge } from '../status-badges';
import { ReplicaStatusTooltip } from '../status-tooltips';
import { VulnerabilitySummary } from '../vulnerability-summary';

import './style.css';

export interface ComponentListProps {
  appName: string;
  environment: Readonly<Environment>;
  components: Readonly<Array<Component>>;
}

function getComponentUrl(
  appName: string,
  envName: string,
  { name, type }: Readonly<Component>
): string {
  return type === 'job'
    ? getActiveJobComponentUrl(appName, envName, name)
    : getActiveComponentUrl(appName, envName, name);
}

function getEnvironmentComponentScanModel(
  data: Readonly<EnvironmentVulnerabilities>,
  name: string,
  type: Component['type']
): ImageWithLastScan {
  let componentKey = '' as keyof EnvironmentVulnerabilities;
  switch (type) {
    case 'component':
      componentKey = 'components';
      break;
    case 'job':
      componentKey = 'jobs';
      break;
    default:
      break;
  }

  return data?.[componentKey]?.[name];
}

function hasComponentOAuth2Service(
  c: Component
): c is Component & { oauth2: OAuth2AuxiliaryResource } {
  return !!c.oauth2;
}

function hasComponentAdditionalInfo(c: Component): boolean {
  return hasComponentOAuth2Service(c);
}

const ReplicaLinks: FunctionComponent<{
  replicaList?: Readonly<Array<ReplicaSummary>>;
  urlFunc: (replica: ReplicaSummary) => string;
}> = ({ replicaList, urlFunc }) =>
  replicaList && replicaList.length > 0 ? (
    <div className="component-replica__link-container">
      {replicaList.map((x, i) => (
        <Typography
          key={i}
          className="component-replica__link"
          as={Link}
          to={urlFunc(x)}
          link
        >
          <ReplicaStatusTooltip status={x.replicaStatus?.status} />
          {smallReplicaName(x.name)}
        </Typography>
      ))}
    </div>
  ) : (
    <Typography>No active replicas</Typography>
  );

const EnvironmentComponentScanSummary: FunctionComponent<{
  scan?: Readonly<ImageWithLastScan>;
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
  const [expandedComponents, setExpandedComponents] = useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      components
        .filter(hasComponentOAuth2Service)
        .map((c) => [c.name, c.oauth2?.deployment.status !== 'Consistent'])
    )
  );
  const [trigger, { data: vulnerabilities, ...vulnerabilityState }] =
    scanApi.endpoints.getEnvironmentVulnerabilitySummary.useLazyQuery();
  const expandComponent = useCallback(
    (name: string) =>
      setExpandedComponents((x) => ({ ...x, [name]: !x[name] })),
    []
  );

  useEffect(() => {
    const request = trigger({ appName, envName });
    return () => request?.abort();
  }, [appName, envName, trigger]);

  const compMap = useMemo(() => buildComponentMap(components), [components]);
  const showChevronColumn = useMemo(
    () => components.some(hasComponentAdditionalInfo),
    [components]
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
              <Accordion.HeaderTitle>
                <Typography variant="h4" as="span">
                  Active {upperFirst(type)}s
                </Typography>
              </Accordion.HeaderTitle>
            </Accordion.Header>
            <Accordion.Panel>
              <div className="grid grid--table-overflow">
                <Table className="component-list">
                  <Table.Head>
                    <Table.Row>
                      {showChevronColumn && <Table.Cell />}
                      <Table.Cell className="component-list-head__name">
                        ID
                      </Table.Cell>
                      <Table.Cell className="component-list-head__status">
                        Status
                      </Table.Cell>
                      <Table.Cell className="component-list-head__replicas">
                        Replicas
                      </Table.Cell>
                      <Table.Cell className="component-list-head__vulnerabilities">
                        Vulnerabilities
                      </Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {compMap[type]
                      .map((x, i) => ({
                        x,
                        expanded: !!expandedComponents[x.name],
                        i,
                      }))
                      .map(({ x, expanded, i }) => (
                        <Fragment key={i}>
                          <Table.Row
                            className={clsx({
                              'border-bottom-transparent': expanded,
                            })}
                          >
                            {showChevronColumn && (
                              <Table.Cell
                                className={'fitwidth padding-right-0'}
                              >
                                {hasComponentOAuth2Service(x) && (
                                  <Typography link as="span">
                                    <Icon
                                      title="Toggle more information"
                                      data={
                                        expanded ? chevron_up : chevron_down
                                      }
                                      size={24}
                                      role="button"
                                      onClick={() => expandComponent(x.name)}
                                    />
                                  </Typography>
                                )}
                              </Table.Cell>
                            )}
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
                                replicaList={x.replicaList}
                                urlFunc={(r: ReplicaSummary) =>
                                  getReplicaUrl(
                                    appName,
                                    envName,
                                    x.name,
                                    r.name
                                  )
                                }
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <AsyncResource
                                asyncState={vulnerabilityState}
                                errorContent={
                                  <samp>
                                    {vulnerabilityState.isError &&
                                      (({ code, message }) =>
                                        [code, message]
                                          .filter((x) => !!x)
                                          .join(': '))(
                                        getFetchErrorData(
                                          vulnerabilityState.error
                                        )
                                      )}
                                  </samp>
                                }
                              >
                                {vulnerabilities && (
                                  <EnvironmentComponentScanSummary
                                    scan={getEnvironmentComponentScanModel(
                                      vulnerabilities,
                                      x.name,
                                      x.type
                                    )}
                                  />
                                )}
                              </AsyncResource>
                            </Table.Cell>
                          </Table.Row>
                          {expanded && (
                            <>
                              {hasComponentOAuth2Service(x) && (
                                <Table.Row>
                                  <Table.Cell />
                                  <Table.Cell>
                                    <div className="grid grid--gap-x-small grid--auto-columns grid--align-center">
                                      <Icon data={security} color="gray" />
                                      <Typography>OAuth2 Service</Typography>
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <ComponentStatusBadge
                                      status={x.oauth2.deployment.status}
                                    />
                                  </Table.Cell>
                                  <Table.Cell>
                                    <ReplicaLinks
                                      replicaList={
                                        x.oauth2.deployment.replicaList
                                      }
                                      urlFunc={(r: ReplicaSummary) =>
                                        getOAuthReplicaUrl(
                                          appName,
                                          envName,
                                          x.name,
                                          r.name
                                        )
                                      }
                                    />
                                  </Table.Cell>
                                  <Table.Cell />
                                </Table.Row>
                              )}
                            </>
                          )}
                        </Fragment>
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
  environment: PropTypes.object.isRequired as PropTypes.Validator<Environment>,
  components: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<Component>
  ).isRequired,
};
