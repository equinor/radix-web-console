import { Icon, Typography } from '@equinor/eds-core-react';
import { time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';
import { StepModelValidationMap } from '../../models/radix-api/jobs/step';
import { routes } from '../../routes';
import { differenceInWords, formatDateTimePrecise } from '../../utils/datetime';
import { getPipelineStepDescription } from '../../utils/pipeline';
import { routeWithParams } from '../../utils/string';

const StepDuration = ({ step: { ended, started } }) =>
  !!started ? (
    <>
      <RelativeToNow time={started} titlePrefix="Start time" capitalize />
      {!!ended && (
        <span title={`End time ${formatDateTimePrecise(ended)}`}>
          {differenceInWords(ended, started)}
        </span>
      )}
    </>
  ) : (
    'Not yet started'
  );

const getComponents = (name, components) => {
  if (components?.length > 1) {
    const maxEnumeratedComponents = 3;
    return components.length > maxEnumeratedComponents
      ? components.slice(0, maxEnumeratedComponents - 1).join(',') + '...'
      : components.slice(0, -1).join(',') + ' and ' + components.slice(-1);
  }

  return name;
};

const getDescription = (step) => {
  const stepDescription = getPipelineStepDescription(step.name);
  if (stepDescription) {
    return stepDescription;
  }

  const buildComponent = step.name.match(/^build-(.+)$/);
  if (buildComponent) {
    return (
      <>
        Building{' '}
        <strong>{getComponents(buildComponent[1], step.components)}</strong>{' '}
        component
      </>
    );
  }

  const scanComponent = step.name.match(/^scan-(.+)$/);
  if (scanComponent) {
    return (
      <>
        Scanning{' '}
        <strong>{getComponents(scanComponent[1], step.components)}</strong>{' '}
        component
      </>
    );
  }

  return 'Unknown step';
};

export const StepSummary = ({ appName, jobName, step }) => (
  <div className="step-summary__content">
    <div className="step-summary__description">
      <Link
        className="step-summary__link"
        to={routeWithParams(routes.appJobStep, {
          appName,
          jobName,
          stepName: step.name,
        })}
      >
        <Typography link as="span" token={{ textDecoration: 'none' }}>
          {getDescription(step)}
        </Typography>
      </Link>
      <div>
        <StatusBadge type={step.status}>{step.status}</StatusBadge>
      </div>
    </div>
    <div className="step-summary__time">
      <Icon className="step__icon" data={time} />
      <div className="grid grid--gap-small">
        <StepDuration step={step} />
      </div>
    </div>
  </div>
);

StepSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  step: PropTypes.shape(StepModelValidationMap).isRequired,
};
