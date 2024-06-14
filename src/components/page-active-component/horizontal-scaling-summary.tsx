import { Accordion, Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  HorizontalScalingSummary as HorizontalScalingSummaryModel,
  HorizontalScalingSummaryTriggerStatus,
} from '../../store/radix-api';
import { pluraliser } from '../../utils/string';
import { Alert } from '../alert';

export const HorizontalScalingSummary: FunctionComponent<
  HorizontalScalingSummaryModel
> = (data) => (
  <Accordion className="accordion elevated" chevronPosition="right">
    <Accordion.Item isExpanded>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography className="whitespace-nowrap" variant="h4" as="span">
            Horizontal scaling
          </Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid grid--gap-medium">
          <dl className="o-key-values">
            <Typography as="dt">Current replicas:</Typography>
            <Typography as="dd" variant="body_short_bold">
              {data.currentReplicas}
            </Typography>

            <Typography as="dt">Desired replicas:</Typography>
            <Typography as="dd" variant="body_short_bold">
              {data.currentReplicas}
            </Typography>

            {!isNil(data.minReplicas) && (
              <>
                <Typography as="dt">Min replicas:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.minReplicas}
                </Typography>
              </>
            )}

            {!isNil(data.maxReplicas) && (
              <>
                <Typography as="dt">Max replicas:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.maxReplicas}
                </Typography>
              </>
            )}

            {data.pollingInterval > 0 && (
              <>
                <Typography as="dt">Polling interval:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.pollingInterval}sec
                </Typography>
              </>
            )}

            {data.cooldownPeriod > 0 && (
              <>
                <Typography as="dt">Cooldown period:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.cooldownPeriod}sec
                </Typography>
              </>
            )}

            {data.triggers.map((trigger, i) => (
              <TriggerStatus key={trigger.name + i} trigger={trigger} />
            ))}
          </dl>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

HorizontalScalingSummary.propTypes = {
  currentCPUUtilizationPercentage: PropTypes.number,
  currentMemoryUtilizationPercentage: PropTypes.number,
  maxReplicas: PropTypes.number,
  minReplicas: PropTypes.number,
  targetCPUUtilizationPercentage: PropTypes.number,
  targetMemoryUtilizationPercentage: PropTypes.number,
};

type TriggerStatusProps = {
  trigger: HorizontalScalingSummaryTriggerStatus;
};
const TriggerStatus = ({ trigger }: TriggerStatusProps) => {
  let unitFn = pluraliser('%', '%');

  if (trigger.type == 'cron') unitFn = pluraliser('replica', 'replicas');
  if (trigger.type == 'azure-servicebus')
    unitFn = pluraliser('message', 'messages');

  return (
    <>
      <Typography as="dt">{trigger.name}:</Typography>
      <Typography as="dd">
        <strong>
          {trigger.currentUtilization
            ? unitFn(Number(trigger.currentUtilization))
            : '-'}
        </strong>{' '}
        of <strong>{unitFn(Number(trigger.targetUtilization))} </strong>
        target utilization
        {trigger.error && (
          <>
            <br />
            <Alert type={'danger'}>{trigger.error}</Alert>
          </>
        )}
      </Typography>
    </>
  );
};
