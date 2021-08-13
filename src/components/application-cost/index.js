import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import AsyncResource from '../async-resource/simple-async-resource';
import useGetApplicationCost from './use-get-application-cost';
import applicationCostSet from '../../models/application-cost-set';
import { CostContent } from './cost-content';
import moment from 'moment';
import '../app-overview/style.css';
import { Typography } from '@equinor/eds-core-react';
const periodDateFormat = 'YYYY-MM-DD';

export const ApplicationCost = (props) => {
  const { appName, from, to } = props;
  const [applicationCost] = useGetApplicationCost(appName, from, to);

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost estimate</Typography>
      <React.Fragment>
        <div className="grid grid--gap-medium cost-section">
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
