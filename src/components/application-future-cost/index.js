import { connect } from 'react-redux';
import useGetApplicationCostEstimate from './use-get-application-cost-estimate';
import PropTypes from 'prop-types';
import applicationCost from '../../models/application-cost';
import React from 'react';
import AsyncResource from '../async-resource/simple-async-resource';
import { CostEstimateContent } from './cost-estimate-content';
import '../app-overview/style.css';

export const FutureApplicationCost = (props) => {
  const { appName } = props;
  const [applicationCost] = useGetApplicationCostEstimate(appName);

  return (
    <div className="app-overview__short-info-tile">
      <h6>Cost forecast</h6>
      <React.Fragment>
        <div className="app-overview__info-tile-body">
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
