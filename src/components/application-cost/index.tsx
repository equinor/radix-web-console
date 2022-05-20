import { Typography } from '@equinor/eds-core-react';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CostContent } from './cost-content';
import { useGetApplicationCost } from './use-get-application-cost';

import AsyncResource from '../async-resource/simple-async-resource';

import '../app-overview/style.css';

const periodDateFormat: string = 'YYYY-MM-DD';

interface ApplicationCostDuration {
  from?: string;
  to?: string;
}
export interface ApplicationCostProps extends ApplicationCostDuration {
  appName: string;
}

export const ApplicationCost = (props: ApplicationCostProps): JSX.Element => {
  const [applicationCost] = useGetApplicationCost(
    props.appName,
    props.from,
    props.to
  );

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

function getDefaultFromDate(): string {
  return moment()
    .utc()
    .startOf('day')
    .subtract(1, 'months')
    .format(periodDateFormat);
}

function getDefaultToDate(): string {
  return moment().utc().startOf('day').format(periodDateFormat);
}

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
} as PropTypes.ValidationMap<ApplicationCostProps>;

const mapStateToProps = (): ApplicationCostDuration => ({
  from: getDefaultFromDate(),
  to: getDefaultToDate(),
});

export default connect(mapStateToProps)(ApplicationCost);
