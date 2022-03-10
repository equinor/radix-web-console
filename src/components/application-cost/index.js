import { Typography } from '@equinor/eds-core-react';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CostContent } from './cost-content';
import { useGetApplicationCost } from './use-get-application-cost';

import AsyncResource from '../async-resource/simple-async-resource';

import '../app-overview/style.css';

const periodDateFormat = 'YYYY-MM-DD';

export const ApplicationCost = (props) => {
  const { appName, from, to } = props;
  const [applicationCost] = useGetApplicationCost(appName, from, to);

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost estimate</Typography>
      <div className="grid grid--gap-medium cost-section">
        <AsyncResource asyncState={applicationCost}>
          <CostContent applicationCostSet={applicationCost.data} />
        </AsyncResource>
      </div>
    </div>
  );
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

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
};

const mapStateToProps = () => ({
  from: getDefaultFromDate(),
  to: getDefaultToDate(),
});

export default connect(mapStateToProps)(ApplicationCost);
