import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import AsyncResource from '../async-resource';
import './style.css';
import { getApplicationCost } from '../../state/application-cost';
import applicationCostSet from '../../models/application-cost-set';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { CostContent } from './cost-content';
import Spinner from '../spinner';
import * as subscriptionCostApiActions from '../../state/subscriptions-cost-api/action-creators';
import moment from 'moment';

const periodDateFormat = 'YYYY-MM-DD';

export const ApplicationCost = (props) => {
  const {
    appName,
    from,
    to,
    applicationCostSet,
    subscriptionCostApiActions,
    unsubscriptionCostApiActions,
  } = props;
  useEffect(() => {
    subscriptionCostApiActions(appName, from, to);
    return () => {
      unsubscriptionCostApiActions(appName, from, to);
    };
  }, [
    subscriptionCostApiActions,
    unsubscriptionCostApiActions,
    appName,
    from,
    to,
  ]);
  return (
    <AsyncResource resource="APP_COST" resourceParams={[appName]}>
      <div className="app-overview__info-tile">
        <h3 className="app-overview__info-tile-head">Cost estimate</h3>
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

const mapStateToProps = (state) => ({
  applicationCostSet: getApplicationCost(state),
  from: getDefaultFromDate(),
  to: getDefaultToDate(),
});

const mapDispatchToProps = (dispatch) => ({
  subscriptionCostApiActions: (appName, from, to) => {
    return dispatch(
      subscriptionCostApiActions.subscribeApplicationCost(appName, from, to)
    );
  },
  unsubscriptionCostApiActions: (appName, from, to) => {
    return dispatch(
      subscriptionCostApiActions.unsubscribeApplicationCost(appName, from, to)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCost);
