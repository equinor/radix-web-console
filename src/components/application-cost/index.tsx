import { Typography } from '@equinor/eds-core-react';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { format } from 'date-fns';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../async-resource/simple-async-resource';
import { RequestState } from '../../state/state-utils/request-states';
import { ApplicationCostSet, useGetTotalCostQuery } from '../../store/cost-api';
import { formatDateTimeYear } from '../../utils/datetime';

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
  const { data: cost, status } = useGetTotalCostQuery({
    appName,
    fromTime: from,
    toTime: to,
  });

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost estimate</Typography>
      <AsyncResource
        asyncState={{
          status:
            status === QueryStatus.pending
              ? RequestState.IN_PROGRESS
              : status === QueryStatus.fulfilled
              ? RequestState.SUCCESS
              : status === QueryStatus.uninitialized
              ? RequestState.IDLE
              : RequestState.FAILURE,
        }}
      >
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

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
};

export default connect<ApplicationCostDuration>(() => {
  const night = new Date();
  night.setUTCHours(0, 0, 0, 0);

  return {
    from: format(night.setUTCMonth(night.getUTCMonth() - 1), periodDateFormat),
    to: format(new Date().setUTCHours(0, 0, 0, 0), periodDateFormat),
  };
})(ApplicationCost);
