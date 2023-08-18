import { Typography } from '@equinor/eds-core-react';
import { format } from 'date-fns';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { CostContent } from './cost-content';
import { useGetApplicationCost } from './use-get-application-cost';

import AsyncResource from '../async-resource/simple-async-resource';

import '../app-overview/style.css';

const periodDateFormat = 'yyyy-MM-dd';

function getDefaultFromDate(): string {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  return format(
    startOfDay.setUTCMonth(startOfDay.getUTCMonth() - 1),
    periodDateFormat
  );
}

function getDefaultToDate(): string {
  return format(new Date().setUTCHours(0, 0, 0, 0), periodDateFormat);
}

interface ApplicationCostDuration {
  from?: string;
  to?: string;
}

export interface ApplicationCostProps extends ApplicationCostDuration {
  appName: string;
}

export const ApplicationCost: FunctionComponent<ApplicationCostProps> = ({
  appName,
  from,
  to,
}) => {
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

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
};

function mapStateToProps(): ApplicationCostDuration {
  return { from: getDefaultFromDate(), to: getDefaultToDate() };
}

export default connect(mapStateToProps)(ApplicationCost);
