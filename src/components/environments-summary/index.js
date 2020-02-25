import {
  faGlobeAfrica,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import EmptyState from '../empty-state';

import EnvironmentCard from './environment-card';
import './style.css';

import environmentSummaryModel from '../../models/environment-summary';

const noEnvsIcon = (
  <span className="environments-summary__no-envs-icon fa-layers fa-fw fa-5x">
    <FontAwesomeIcon icon={faGlobeAfrica} />
    <FontAwesomeIcon
      icon={faQuestionCircle}
      transform="shrink-10 down-5 right-5"
    />
  </span>
);

export const EnvironmentsSummary = ({ appName, envs }) => (
  <div className="environments-summary">
    {envs.length === 0 && (
      <EmptyState title="No environments" icon={noEnvsIcon}>
        <p>
          You must define at least one environment in{' '}
          <code>radixconfig.yaml</code>
        </p>
      </EmptyState>
    )}
    {envs.length > 0 && (
      <React.Fragment>
        <ul className="env-summary-list">
          {envs.map(env => (
            <li key={env.name}>
              <EnvironmentCard appName={appName} env={env} />
            </li>
          ))}
        </ul>
      </React.Fragment>
    )}
  </div>
);

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(environmentSummaryModel)).isRequired,
};

export default EnvironmentsSummary;
