import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Chip, { progressStatusToChipType } from '../chip';
import Clickbox from '../clickbox';
import RelativeToNow from '../time/relative-to-now';

import { differenceInWords, formatDateTimePrecise } from '../../utils/datetime';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import StepModel from '../../models/step';

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
  <Clickbox>
    <div className="step-summary">
      <ul className="step-summary__data">
        <li className="step-summary__data-section">
          <div className="job-summary__data-list">
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
          </div>
        </li>
        <li className="step-summary__data-section">
          <div className="step-summary__icon">
            <FontAwesomeIcon icon={faClock} size="lg" />
          </div>
          <div className="step-summary__data-list">
            <StartAndDuration step={step} />
          </div>
        </li>
        <li className="step-summary__data-section">
          <Chip type={progressStatusToChipType(step.status)}>
            {step.status}
          </Chip>
        </li>
      </ul>
    </div>
  </Clickbox>
);

StepSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  step: PropTypes.shape(StepModel).isRequired,
};

export default StepSummary;
