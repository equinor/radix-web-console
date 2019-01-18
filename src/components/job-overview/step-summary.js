import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import PropTypes from 'prop-types';
import React from 'react';

import Clickbox from '../clickbox';

import { routeWithParams, formatDateTime } from '../../utils/string';
import routes from '../../routes';

const Duration = ({ step }) => {
  if (!step.ended) {
    return null;
  }

  return (
    <span title="Step duration">
      {distanceInWords(new Date(step.started), new Date(step.ended))}
    </span>
  );
};

const getDescription = step => {
  if (step.name === 'clone') {
    return 'Cloning repository';
  }

  if (step.name === 'radix-pipeline') {
    return 'Orchestrating job';
  }

  const buildComponent = step.name.match(/^build-(.+)$/);

  if (buildComponent) {
    return (
      <React.Fragment>
        Building <strong>{buildComponent[1]}</strong> component
      </React.Fragment>
    );
  }

  return 'Unknown step';
};

const StepSummary = ({ appName, jobName, step }) => (
  <Clickbox>
    <div className={`step-summary step-summary--${step.status.toLowerCase()}`}>
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
            <div title="Start time">{formatDateTime(step.started)}</div>
            <Duration step={step} />
          </div>
        </li>
        <li className="step-summary__data-section">
          <span className="step-summary__status">{step.status}</span>
        </li>
      </ul>
    </div>
  </Clickbox>
);

StepSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  // step: PropTypes.shape(StepSummaryModel).isRequired,
};

export default StepSummary;
