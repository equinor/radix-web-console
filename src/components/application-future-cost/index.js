import { connect } from 'react-redux';
import { ApplicationCost } from '../application-cost';
import useGetApplicationCostEstimate from './use-get-application-cost-estimate';
import PropTypes from 'prop-types';
import applicationCost from '../../models/application-cost';
import React from 'react';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AsyncResource from '../async-resource/simple-async-resource';
import { CostEstimateContent } from './cost-estimate-content';

export const FutureApplicationCost = (props) => {
  const { appName } = props;
  const [applicationCost] = useGetApplicationCostEstimate(appName);

  return (
    <div className="app-overview_info-tile">
      <h3 className="app-overview_info-tile-head">Future estimate</h3>
      <FontAwesomeIcon
        className="app-overview_info-tile-head"
        icon={faChartArea}
        size="6x"
      />
      <React.Fragment>
        <div className="app-overview_info-tile-body">
          <AsyncResource asyncState={applicationCost}>
            <CostEstimateContent applicationCost={applicationCost.data} />
          </AsyncResource>
        </div>
      </React.Fragment>
    </div>
  );
};

FutureApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  applicationCostEstimate: PropTypes.shape(applicationCost),
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(FutureApplicationCost);
