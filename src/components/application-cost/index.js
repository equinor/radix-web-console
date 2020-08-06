import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AsyncResource from '../async-resource';
import './style.css';
import { getApplicationCost } from '../../state/application-cost';
import applicationCostSet from '../../models/application-cost-set';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { CostContent } from './cost-content';
import Spinner from '../spinner';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as subscriptionCostApiActions from '../../state/subscriptions-cost-api/action-creators';

export const ApplicationCost = (props) => {
  const { appName } = props;
  const [applicationCostSet, setApplicationCostSet] = useState(null);
  useEffect(() => {
    props.subscriptionCostApiActions(props.appName);
    setApplicationCostSet(props.applicationCostSet);
    return () => {
      props.unsubscriptionCostApiActions(props.appName);
    };
  }, [props.applicationCostSet]);
  return (
    <AsyncResource resource="APP_COST" resourceParams={[appName]}>
      <div className="app-overview__info-tile">
        <h3 className="app-overview__info-tile-head">Cost</h3>
        <FontAwesomeIcon
          className="app-overview__info-tile-image"
          icon={faChartArea}
          size="6x"
        />
        <React.Fragment>
          <div className="app-overview__info-tile-body">
            {applicationCostSet === null ? (
              <Spinner />
            ) : (
              <CostContent applicationCostSet={applicationCostSet} />
            )}
          </div>
        </React.Fragment>
      </div>
    </AsyncResource>
  );
};

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  applicationCostSet: PropTypes.shape(applicationCostSet),
};

const mapStateToProps = (state) => ({
  applicationCostSet: getApplicationCost(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscriptionCostApiActions: () =>
    dispatch(subscriptionCostApiActions.subscribeApplicationCost(appName)),
  unsubscriptionCostApiActions: () =>
    dispatch(subscriptionCostApiActions.unsubscribeApplicationCost(appName)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCost);
