import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import AsyncResource from '../async-resource/simple-async-resource';
import useGetApplicationCost from './use-get-application-cost';
import applicationCostSet from '../../models/application-cost-set';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { CostContent } from './cost-content';
import moment from 'moment';
import '../app-overview/style.css';
const periodDateFormat = 'YYYY-MM-DD';

export const ApplicationCost = (props) => {
  const { appName, from, to } = props;
  const [applicationCost] = useGetApplicationCost(appName, from, to);

  return (
    <div className="app-overview__short-info-tile">
      <h3 className="app-overview__info-tile-head">Cost estimate</h3>
      <FontAwesomeIcon
        className="app-overview__info-tile-image"
        icon={faChartArea}
        size="6x"
      />
      <React.Fragment>
        <div className="app-overview__info-tile-body">
          <AsyncResource asyncState={applicationCost}>
            <CostContent applicationCostSet={applicationCost.data} />
          </AsyncResource>
        </div>
      </React.Fragment>
    </div>
  );
};

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  applicationCostSet: PropTypes.shape(applicationCostSet),
  from: PropTypes.string,
  to: PropTypes.string,
};

function getDefaultFromDate() {
  return moment
    .utc()
    .clone()
    .startOf('day')
    .subtract(1, 'months')
    .format(periodDateFormat);
}

function getDefaultToDate() {
  return moment.utc().clone().startOf('day').format(periodDateFormat);
}

const mapStateToProps = () => ({
  from: getDefaultFromDate(),
  to: getDefaultToDate(),
});

export default connect(mapStateToProps)(ApplicationCost);
