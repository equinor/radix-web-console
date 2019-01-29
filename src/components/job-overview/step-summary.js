import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React from 'react';

import Chip, { progressStatusToChipType } from '../chip';
import Clickbox from '../clickbox';
import RelativeToNow from '../time/relative-to-now';

import { differenceInWords } from '../../utils/datetime';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ssZ';

const Duration = ({ step }) => {
  const endDate = step.ended || new Date();
  return (
    <span title={step.ended && format(step.ended, DATETIME_FORMAT)}>
      {differenceInWords(endDate, new Date(step.started), {
        includeSeconds: true,
      })}
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
            <RelativeToNow time={step.started} titlePrefix="Start time" />
            <Duration step={step} />
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
  // step: PropTypes.shape(StepSummaryModel).isRequired,
};

export default StepSummary;
