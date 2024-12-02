import { Typography } from '@equinor/eds-core-react';
import { format } from 'date-fns';
import type { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import {
  type ApplicationCostSet,
  useGetTotalCostQuery,
} from '../../store/cost-api';
import { formatDateTimeYear } from '../../utils/datetime';
import AsyncResource from '../async-resource/async-resource';

import '../application-cost/style.css';

const periodDateFormat = 'yyyy-MM-dd';

function getCostByCpu({ applicationCosts }: ApplicationCostSet): string {
  return !Number.isNaN(applicationCosts?.[0]?.cost ?? NaN)
    ? `${applicationCosts[0].cost.toFixed(2)} ${applicationCosts[0].currency}`
    : 'No data';
}

function getPeriod({ from, to }: ApplicationCostSet): string {
  return `${formatDateTimeYear(new Date(from))} - ${formatDateTimeYear(
    new Date(to)
  )}`;
}

interface ApplicationCostDuration {
  from: string;
  to: string;
}

export interface ApplicationCostProps extends ApplicationCostDuration {
  appName: string;
}

export const ApplicationCost: FunctionComponent<ApplicationCostProps> = ({
  appName,
  from,
  to,
}) => {
  const { data: cost, ...state } = useGetTotalCostQuery(
    { appName, fromTime: from, toTime: to },
    { skip: !appName || !from || !to }
  );

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost estimate</Typography>
      <AsyncResource asyncState={state}>
        {cost ? (
          <div className="cost-section grid grid--gap-medium">
            <div className="grid grid--gap-small">
              <Typography variant="overline">Period</Typography>
              <Typography group="input" variant="text">
                {getPeriod(cost)}
              </Typography>
            </div>

            <div className="grid grid--gap-small">
              <Typography variant="overline">Cost</Typography>
              <Typography group="input" variant="text">
                {getCostByCpu(cost)}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography variant="caption">No data</Typography>
        )}
      </AsyncResource>
    </div>
  );
};

export default connect<ApplicationCostDuration>(() => {
  const night = new Date();
  night.setUTCHours(0, 0, 0, 0);

  return {
    from: format(night.setUTCMonth(night.getUTCMonth() - 1), periodDateFormat),
    to: format(new Date().setUTCHours(0, 0, 0, 0), periodDateFormat),
  };
})(ApplicationCost);
