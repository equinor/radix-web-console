import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import AsyncResource from '../async-resource';
import './style.css';
import * as subscriptionCostApiActions from '../../state/subscriptions-cost-api/action-creators';
import { getApplicationCost } from '../../state/application-cost';
import applicationCostSet from '../../models/application-cost-set';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import format from 'date-fns/format';

export class ApplicationCost extends React.Component {
  constructor(props) {
    super(props);
    props.subscribeApplicationCost(props.appName);
  }

  componentWillUnmount() {
    this.props.unsubscribeApplicationCost(this.props.appName);
  }

  componentDidUpdate(prevProps) {
    const { appName } = this.props;
    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplicationCost(prevProps.appName);
      this.props.subscribeApplicationCost(appName);
    }
  }

  render() {
    const { appName, applicationCostSet } = this.props;
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
            {applicationCostSet !== null &&
              applicationCostSet.applicationCosts.length > 0 && (
                <div className="app-overview__info-tile-body">
                  <p>
                    Period:&nbsp;
                    <span>
                      {format(
                        new Date(applicationCostSet.from),
                        'DD.MM.YYYY HH:mm'
                      )}
                    </span>
                    &nbsp;-&nbsp;
                    <span>
                      {format(
                        new Date(applicationCostSet.to),
                        'DD.MM.YYYY HH:mm'
                      )}
                    </span>
                  </p>
                  <table>
                    <tr>
                      <td width="100">CPU</td>
                      <td>
                        {applicationCostSet.applicationCosts[0].costPercentageByCpu.toFixed(
                          4
                        )}
                        &nbsp;%
                      </td>
                    </tr>
                    <tr>
                      <td>Memory</td>
                      <td>
                        {applicationCostSet.applicationCosts[0].costPercentageByMemory.toFixed(
                          4
                        )}
                        &nbsp;%
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            {(applicationCostSet === null ||
              applicationCostSet.applicationCosts.length === 0) && (
              <div className="app-overview__info-tile-body">
                <p>Loading...</p>
              </div>
            )}
          </React.Fragment>
        </div>
      </AsyncResource>
    );
  }
}

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  applicationCostSet: PropTypes.shape(applicationCostSet),
};

const mapStateToProps = (state) => ({
  applicationCostSet: getApplicationCost(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplicationCost: () =>
    dispatch(subscriptionCostApiActions.subscribeApplicationCost(appName)),
  unsubscribeApplicationCost: (oldAppName = appName) =>
    dispatch(subscriptionCostApiActions.unsubscribeApplicationCost(oldAppName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCost);
