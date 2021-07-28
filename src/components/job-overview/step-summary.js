import { Icon } from '@equinor/eds-core-react';
import { time, error_outlined } from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { StatusBadge } from '../status-badge';
import RelativeToNow from '../time/relative-to-now';
import VulnerabilitySummary from '../vulnerability-summary';
import StepModel from '../../models/step';
import routes from '../../routes';
import { differenceInWords, formatDateTimePrecise } from '../../utils/datetime';
import { routeWithParams } from '../../utils/string';

const ScanMissing = (scan) => {
  return (
    <div className="step-summaery__scan-missing">
      <Icon data={error_outlined} />
      {scan.reason}
    </div>
  );
};

const ScanSuccess = (scan) => {
  return (
    <VulnerabilitySummary
      vulnerabilitySummary={scan.vulnerabilities}
    ></VulnerabilitySummary>
  );
};

const ScanSummary = ({ scan }) => {
  switch (scan.status) {
    case 'Success':
      return ScanSuccess(scan);
    case 'Missing':
      return ScanMissing(scan);
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

const StartAndDuration = ({ step }) => {
  if (!step || !step.started) {
    return 'Not yet started';
  }

  return (
    <React.Fragment>
      <RelativeToNow time={step.started} titlePrefix="Start time" />
      <Duration step={step} />
    </React.Fragment>
  );
};

const getComponents = (name, components) => {
  const maxEnumeratedComponents = 3;
  var componentsDescription = name;

  if (components && components.length > 1) {
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
  if (step.name === 'clone-config') {
    return 'Cloning Radix config from config branch';
  }

  if (step.name === 'config-2-map') {
    return 'Copying radixconfig.yaml from config branch';
  }

  if (step.name === 'clone') {
    return 'Cloning repository';
  }

  if (step.name === 'radix-pipeline') {
    return 'Orchestrating job';
  }

  const buildComponent = step.name.match(/^build-(.+)$/);
  const scanComponent = step.name.match(/^scan-(.+)$/);

  if (buildComponent) {
    return (
      <React.Fragment>
        Building{' '}
        <strong>{getComponents(buildComponent[1], step.components)}</strong>{' '}
        component
      </React.Fragment>
    );
  }

  if (scanComponent) {
    return (
      <React.Fragment>
        Scanning{' '}
        <strong>{getComponents(scanComponent[1], step.components)}</strong>{' '}
        component
      </React.Fragment>
    );
  }

  return 'Unknown step';
};

const StepSummary = ({ appName, jobName, step }) => (
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
        {step.name}
      </Link>
      <div>{getDescription(step)}</div>
      {step.scan && (
        <div>
          <ScanSummary scan={step.scan}></ScanSummary>
        </div>
      )}
    </div>
    <div className="step-summary__time">
      <Icon data={time} />
      <div className="step-summary__timestamp">
        <StartAndDuration step={step} />
      </div>
    </div>
    <div>
      <StatusBadge type={step.status}>{step.status}</StatusBadge>
    </div>
  </div>
);

StepSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  step: PropTypes.shape(StepModel).isRequired,
};

export default StepSummary;
