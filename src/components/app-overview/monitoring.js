import React from 'react';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { urlToAppMonitoring } from '../../utils/monitoring';

export const Monitoring = ({ appName }) => {
  return (
    <div className="app-overview__short-info-tile">
      <h3 className="app-overview__info-tile-head">Monitoring</h3>
      <FontAwesomeIcon
        className="app-overview__info-tile-image"
        icon={faChartArea}
        size="6x"
      />
      <div className="app-overview__info-tile-body">
        <p>
          Monitor your application in{' '}
          <a href={urlToAppMonitoring(appName)}>Grafana</a>
        </p>
      </div>
    </div>
  );
};

export default Monitoring;
