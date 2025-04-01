import { Icon, Typography } from '@equinor/eds-core-react';
import { time } from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import type { Step } from '../../store/radix-api';
import { differenceInWords, formatDateTimePrecise } from '../../utils/datetime';
import { routeWithParams } from '../../utils/string';
import { RadixJobConditionBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';

const SubPipelineStepDuration: FunctionComponent<
  Pick<Step, 'started' | 'ended'>
> = ({ ended, started }) =>
  started ? (
    <>
      <RelativeToNow
        time={new Date(started)}
        titlePrefix="Start time"
        capitalize
      />
      {ended && (
        <span title={`End time ${formatDateTimePrecise(new Date(ended))}`}>
          {differenceInWords(new Date(ended), new Date(started))}
        </span>
      )}
    </>
  ) : (
    <>Not yet started</>
  );

export const SubPipelineStepSummary: FunctionComponent<{
  appName: string;
  jobName: string;
  step: Step;
}> = ({ appName, jobName, step }) => (
  <div className="step-summary__content">
    <div className="step-summary__description">
      <Typography
        as={Link}
        to={routeWithParams(routes.appPipelineRunTaskStep, {
          appName: appName,
          jobName: jobName,
          pipelineRunName: step.subPipelineTaskStep?.pipelineRunName ?? '',
          taskName: step.subPipelineTaskStep?.taskName ?? '',
          stepName: step.subPipelineTaskStep?.name ?? '',
        })}
        link
        token={{ textDecoration: 'none', textTransform: 'capitalize' }}
      >
        {step.subPipelineTaskStep?.taskName} / {step.subPipelineTaskStep?.name}
      </Typography>

      <RadixJobConditionBadge status={step.status ?? 'Waiting'} />
    </div>

    <div className="step-summary__time">
      <Icon className="step__icon" data={time} />
      <div className="grid grid--gap-small">
        <SubPipelineStepDuration started={step.started} ended={step.ended} />
      </div>
    </div>
  </div>
);
