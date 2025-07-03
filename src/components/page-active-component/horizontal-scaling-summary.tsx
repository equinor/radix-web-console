import { Accordion, Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash-es';
import type {
  HorizontalScalingSummary as HorizontalScalingSummaryModel,
  HorizontalScalingSummaryTriggerStatus,
} from '../../store/radix-api';
import { pluraliser } from '../../utils/string';
import { Alert } from '../alert';

type Props = {
  summary: HorizontalScalingSummaryModel;
};

export const HorizontalScalingSummary = ({ summary }: Props) => (
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
              {summary.currentReplicas}
            </Typography>

            <Typography as="dt">Desired replicas:</Typography>
            <Typography as="dd" variant="body_short_bold">
              {summary.desiredReplicas}
            </Typography>

            {!isNil(summary.minReplicas) && (
              <>
                <Typography as="dt">Min replicas:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {summary.minReplicas}
                </Typography>
              </>
            )}

            {!isNil(summary.maxReplicas) && (
              <>
                <Typography as="dt">Max replicas:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {summary.maxReplicas}
                </Typography>
              </>
            )}

            {summary.pollingInterval && summary.pollingInterval > 0 && (
              <>
                <Typography as="dt">Polling interval:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {summary.pollingInterval}sec
                </Typography>
              </>
            )}

            {summary.cooldownPeriod && summary.cooldownPeriod > 0 && (
              <>
                <Typography as="dt">Cooldown period:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {summary.cooldownPeriod}sec
                </Typography>
              </>
            )}

            {summary.triggers.map((trigger, i) => (
              <TriggerStatus
                key={(trigger.name ?? trigger.type ?? 'unknown') + i}
                trigger={trigger}
              />
            ))}
          </dl>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

type TriggerStatusProps = {
  trigger: HorizontalScalingSummaryTriggerStatus;
};
const TriggerStatus = ({ trigger }: TriggerStatusProps) => {
  let unitFn = pluraliser('%', '%');

  if (trigger.type == 'cron') unitFn = pluraliser('replica', 'replicas');
  if (trigger.type == 'azure-servicebus')
    unitFn = pluraliser('message', 'messages');
  if (trigger.type == 'azure-eventhub') unitFn = pluraliser('event', 'events');

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
