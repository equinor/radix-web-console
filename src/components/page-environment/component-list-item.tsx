import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ComponentStatusBadge } from '../status-badges';
import { ReplicaStatusTooltip } from '../status-tooltips';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import { ComponentType } from '../../models/component-type';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/environment';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
  getReplicaUrl,
} from '../../utils/routing';
import { smallReplicaName } from '../../utils/string';

import './style.css';

export interface ComponentListItemRowProps {
  appName: string;
  environment: EnvironmentModel;
  component: ComponentModel;
}

const getComponentUrl = (
  appName: string,
  environment: EnvironmentModel,
  component: ComponentModel
): string =>
  component.type === ComponentType.job
    ? getActiveJobComponentUrl(appName, environment.name, component.name)
    : getActiveComponentUrl(appName, environment.name, component.name);

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

export const ComponentListItemRow = ({
  appName,
  component,
  environment,
}: ComponentListItemRowProps): JSX.Element => (
  <Table.Row>
    <Table.Cell>
      <Link to={getComponentUrl(appName, environment, component)}>
        <Typography link as="span">
          {component.name}
        </Typography>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <ComponentStatusBadge status={component.status} />
    </Table.Cell>
    <Table.Cell>
      <ReplicaLinks
        appName={appName}
        envName={environment.name}
        componentName={component.name}
        replicaList={component.replicaList}
      />
    </Table.Cell>
  </Table.Row>
);

ComponentListItemRow.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(EnvironmentModelValidationMap).isRequired,
  component: PropTypes.shape(ComponentModelValidationMap).isRequired,
};
