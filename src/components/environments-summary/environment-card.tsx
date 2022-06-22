import {
  Button,
  Divider,
  Icon,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';
import { link, send } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { EnvironmentIngress } from './environment-ingress';
import {
  EnvironmentCardBadgeStatus,
  EnvironmentCardBadge,
} from './environment-card-badge';
import { useGetComponents } from './use-get-components';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { RelativeToNow } from '../time/relative-to-now';
import { ComponentModel } from '../../models/component';
import { ComponentStatus } from '../../models/component-status';
import { ConfigurationStatus } from '../../models/configuration-status';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';
import { ReplicaStatus } from '../../models/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';

type CardContent = { header: JSX.Element; body: JSX.Element };

export interface EnvironmentCardProps {
  appName: string;
  env: EnvironmentSummaryModel;
}

const ComponentCardStatus = {
  [ComponentStatus.ConsistentComponent]: EnvironmentCardBadgeStatus.Consistent,
  [ComponentStatus.StoppedComponent]: EnvironmentCardBadgeStatus.Stopped,
};

const ReplicaCardStatus = {
  [ReplicaStatus.Succeeded]: EnvironmentCardBadgeStatus.Consistent,
  [ReplicaStatus.Running]: EnvironmentCardBadgeStatus.Running,
  [ReplicaStatus.Starting]: EnvironmentCardBadgeStatus.Starting,
};

const activeDeployment = (
  appName: string,
  env: EnvironmentSummaryModel
): JSX.Element =>
  !env.activeDeployment ? (
    <Button className="button_link" variant="ghost" disabled>
      <Icon data={send} />{' '}
      <Typography group="navigation" variant="button" color="inherit">
        No active deployment
      </Typography>
    </Button>
  ) : (
    <Button
      className="button_link"
      variant="ghost"
      href={routeWithParams(routes.appDeployment, {
        appName: appName,
        deploymentName: env.activeDeployment.name,
      })}
    >
      <Icon data={send} />
      <Typography group="navigation" variant="button" color="primary">
        deployment{' '}
        <Typography group="navigation" variant="button" as="span" color="gray">
          (<RelativeToNow time={env.activeDeployment.activeFrom} />)
        </Typography>
      </Typography>
    </Button>
  );

function generateComponentStatus(
  components: Array<ComponentModel>
): Array<{ title: string; status: EnvironmentCardBadgeStatus }> {
  if (!(components?.length > 0)) return [];

  const status: Array<{ title: string; status: EnvironmentCardBadgeStatus }> =
    [];
  const replicas = components.reduce<Array<ReplicaSummaryNormalizedModel>>(
    (obj, x) => {
      x.replicaList?.forEach((x) => obj.push(x));
      return obj;
    },
    []
  );

  if (components.length > 0) {
    status.push({
      title: 'Components',
      status: components.reduce<EnvironmentCardBadgeStatus>(
        (obj, x) =>
          Math.max(
            ComponentCardStatus[x.status] ?? EnvironmentCardBadgeStatus.Notice,
            obj
          ),
        EnvironmentCardBadgeStatus.Consistent
      ),
    });

    if (replicas.length > 0) {
      status.push({
        title: 'Replicas',
        status: replicas.reduce<EnvironmentCardBadgeStatus>(
          (obj, x) =>
            Math.max(
              ReplicaCardStatus[x.status] ?? EnvironmentCardBadgeStatus.Notice,
              obj
            ),
          EnvironmentCardBadgeStatus.Consistent
        ),
      });
    }
  }

  return status;
}

function CardContentBuilder(
  appName: string,
  envName: string,
  deploymentName: string
): CardContent {
  const [componentsState] = useGetComponents(appName, deploymentName);

  const components = componentsState.data ?? [];
  const status = generateComponentStatus(components);

  return {
    header: (
      <SimpleAsyncResource asyncState={componentsState} customError={<></>}>
        <div className="env_card-header_badges grid grid--auto-columns grid--gap-x-small">
          {status.map(({ title, status }) => (
            <Tooltip key={title} title={title} placement="top">
              <span>
                <EnvironmentCardBadge title={title[0]} status={status} />
              </span>
            </Tooltip>
          ))}
        </div>
      </SimpleAsyncResource>
    ),
    body: (
      <SimpleAsyncResource asyncState={componentsState} customError={<></>}>
        <EnvironmentIngress {...{ appName, envName, components }} />
      </SimpleAsyncResource>
    ),
  };
}

export const EnvironmentCard = ({
  appName,
  env,
}: EnvironmentCardProps): JSX.Element => {
  const elements: CardContent = !env.activeDeployment?.name
    ? {
        header: <></>,
        body: (
          <Button className="button_link" variant="ghost" disabled>
            <Icon data={link} />{' '}
            <Typography group="navigation" variant="button" color="inherit">
              No link available
            </Typography>
          </Button>
        ),
      }
    : CardContentBuilder(appName, env.name, env.activeDeployment.name);

  return (
    <div className="env_card">
      <div className="env_card_header">
        <div>
          <Link
            to={routeWithParams(routes.appEnvironment, {
              appName: appName,
              envName: env.name,
            })}
          >
            <Typography
              group="ui"
              variant="accordion_header"
              as="span"
              color="primary"
            >
              {env.name}
            </Typography>
          </Link>
        </div>

        {elements.header}
      </div>

      <Divider variant="small" />

      <div className="env_card_content grid grid--gap-medium">
        {env.status === ConfigurationStatus.Orphan && (
          <Typography
            group="ui"
            variant="chip__badge"
            token={{ fontStyle: 'italic' }}
          >
            Orphan environment
          </Typography>
        )}

        {elements.body}
        {activeDeployment(appName, env)}

        <Typography group="ui" variant="chip__badge">
          {!env.branchMapping
            ? 'Not built automatically'
            : `Built from ${env.branchMapping} branch`}
        </Typography>
      </div>
    </div>
  );
};

EnvironmentCard.propTypes = {
  appName: PropTypes.string.isRequired,
  env: PropTypes.shape(EnvironmentSummaryModelValidationMap).isRequired,
} as PropTypes.ValidationMap<EnvironmentCardProps>;
