import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ComponentStatusBadge } from '../status-badges';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import { ComponentType } from '../../models/component-type';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/environment';
import {
  getActiveComponentUrl,
  getActiveJobComponentUrl,
  getReplicaUrl,
} from '../../utils/routing';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
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

const ReplicaLinks = (props: {
  appName: string;
  envName: string;
  componentName: string;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
}): JSX.Element => (
  <>
    {props.replicaList?.map((x, i) => (
      <span key={i} className="component-replica__link">
        <Link
          to={getReplicaUrl(
            props.appName,
            props.envName,
            props.componentName,
            x.name
          )}
        >
          <Typography link as="span">
            {smallReplicaName(x.name)}
          </Typography>
        </Link>
      </span>
    )) || <Typography as="span">No active replicas</Typography>}
  </>
);

export const ComponentListItemRow = (
  props: ComponentListItemRowProps
): JSX.Element => (
  <Table.Row>
    <Table.Cell>
      <Link
        to={getComponentUrl(props.appName, props.environment, props.component)}
      >
        <Typography link as="span">
          {props.component.name}
        </Typography>
      </Link>
    </Table.Cell>
    <Table.Cell>
      <ComponentStatusBadge status={props.component.status} />
    </Table.Cell>
    <Table.Cell>
      <ReplicaLinks
        appName={props.appName}
        envName={props.environment.name}
        componentName={props.component.name}
        replicaList={props.component.replicaList}
      />
    </Table.Cell>
  </Table.Row>
);

ComponentListItemRow.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(EnvironmentModelValidationMap).isRequired,
  component: PropTypes.shape(ComponentModelValidationMap).isRequired,
};
