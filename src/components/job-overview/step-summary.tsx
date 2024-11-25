import { Icon, Typography } from '@equinor/eds-core-react';
import { time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import type { Step } from '../../store/radix-api';
import { differenceInWords, formatDateTimePrecise } from '../../utils/datetime';
import { PipelineStep, getPipelineStepDescription } from '../../utils/pipeline';
import { routeWithParams } from '../../utils/string';
import { RadixJobConditionBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';

function getComponents(name: string, components: Array<string>): string {
  if (components?.length > 1) {
    const maxEnumeratedComponents = 3;
    return components.length > maxEnumeratedComponents
      ? `${components.slice(0, maxEnumeratedComponents - 1).join(',')}…`
      : `${components.slice(0, -1).join(',')} and ${components.slice(-1)}`;
  }

  return name;
}

const StepDuration: FunctionComponent<Pick<Step, 'started' | 'ended'>> = ({
  ended,
  started,
}) =>
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

type StepDescriptionProps = { name?: string; components: Step['components'] };
const StepDescription = ({ name, components }: StepDescriptionProps) => {
  const stepDescription = getPipelineStepDescription(name);
  if (stepDescription) {
    return <>{stepDescription}</>;
  }

  if (name === PipelineStep.CloneRepository) {
    return (
      <>
        Cloning repository
        {components?.length == 1 && (
          <>
            {' for '} <strong>{components[0]}</strong>
            {' component'}
          </>
        )}
      </>
    );
  }

  const buildComponent = name?.match(/^build-(.+)$/);
  if (buildComponent) {
    return (
      <>
        Building{' '}
        <strong>{getComponents(buildComponent[1], components ?? [])}</strong>{' '}
        component
      </>
    );
  }

  const scanComponent = name?.match(/^scan-(.+)$/);
  if (scanComponent) {
    return (
      <>
        Scanning{' '}
        <strong>{getComponents(scanComponent[1], components ?? [])}</strong>{' '}
        component
      </>
    );
  }

  return <>Unknown step</>;
};

export const StepSummary: FunctionComponent<{
  appName: string;
  jobName: string;
  step: Step;
}> = ({ appName, jobName, step }) => (
  <div className="step-summary__content">
    <div className="step-summary__description">
      <Typography
        as={Link}
        to={routeWithParams(routes.appJobStep, {
          appName,
          jobName,
          stepName: step.name ?? '',
        })}
        link
        token={{ textDecoration: 'none', textTransform: 'capitalize' }}
      >
        <StepDescription name={step.name} components={step.components} />
      </Typography>

      <RadixJobConditionBadge status={step.status ?? 'Waiting'} />
    </div>

    <div className="step-summary__time">
      <Icon className="step__icon" data={time} />
      <div className="grid grid--gap-small">
        <StepDuration started={step.started} ended={step.ended} />
      </div>
    </div>
  </div>
);

StepSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  step: PropTypes.object.isRequired as PropTypes.Validator<Step>,
};
