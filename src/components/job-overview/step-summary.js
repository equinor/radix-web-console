import { Icon, Typography } from '@equinor/eds-core-react';
import { error_outlined, time } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';
import { VulnerabilitySummary } from '../vulnerability-summary';
import { StepModel } from '../../models/step';
import { ScanStatus } from '../../models/scan-status';
import { routes } from '../../routes';
import { differenceInWords, formatDateTimePrecise } from '../../utils/datetime';
import { routeWithParams } from '../../utils/string';
import { StepModelNormalizer } from '../../models/step/normaliser';
import { getPipelineStepDescription } from '../../utils/pipeline';

const ScanSummary = ({ scan }) => {
  if (!scan) {
    return null;
  }

  switch (scan.status) {
    case ScanStatus.Success:
      return <VulnerabilitySummary summary={scan.vulnerabilities} />;
    case ScanStatus.Missing:
      return (
        <div className="step-summary__scan-missing">
          <Icon className="step__icon" data={error_outlined} />
          <Typography>{scan.reason}</Typography>
        </div>
      );
    default:
      return null;
  }
};

const Duration = ({ step }) => {
  if (!step || !step.started || !step.ended) {
    return null;
  }

  const endDate = step.ended || new Date();
  const title = step.ended
    ? `End time ${formatDateTimePrecise(step.ended)}`
    : '';

  return (
    <span title={title}>
      {differenceInWords(endDate, new Date(step.started), {
        includeSeconds: true,
      })}
    </span>
  );
};

const StartAndDuration = ({ step }) =>
  !step?.started ? (
    'Not yet started'
  ) : (
    <>
      <RelativeToNow time={step.started} titlePrefix="Start time" capitalize />
      <Duration step={step} />
    </>
  );

const getComponents = (name, components) => {
  const maxEnumeratedComponents = 3;

  let componentsDescription = name;
  if (components?.length > 1) {
    componentsDescription =
      components.slice(0, -1).join(',') + ' and ' + components.slice(-1);

    if (components.length > maxEnumeratedComponents) {
      componentsDescription =
        components.slice(0, maxEnumeratedComponents - 1).join(',') + '...';
    }
  }

  return componentsDescription;
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

const StepSummary = ({ appName, jobName, step }) => {
  let stepDescription = getDescription(step);
  return (
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
            {stepDescription}
          </Typography>
        </Link>
        <ScanSummary scan={step.scan} />
        <div>
          <StatusBadge type={step.status}>{step.status}</StatusBadge>
        </div>
      </div>
      <div className="step-summary__time">
        <Icon className="step__icon" data={time} />
        <div className="grid grid--gap-small">
          <StartAndDuration step={step} />
        </div>
      </div>
    </div>
  );
};

StepSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  step: PropTypes.shape(StepModelNormalizer).isRequired,
};

export default StepSummary;
