import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import AsyncResource from '../async-resource/simple-async-resource';
import { ApplicationCost, useGetFutureCostQuery } from '../../store/cost-api';
import { formatDateTimeYear } from '../../utils/datetime';

import '../application-cost/style.css';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { RequestState } from '../../state/state-utils/request-states';

function getCostEstimate({ cost, currency }: ApplicationCost): string {
  return !Number.isNaN(cost) ? `${cost.toFixed()} ${currency}` : 'No data';
}

function getPeriod(): string {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 30);

  return `${formatDateTimeYear(today)} - ${formatDateTimeYear(nextMonth)}`;
}

export interface FutureApplicationCostProps {
  appName: string;
}

export const FutureApplicationCost: FunctionComponent<
  FutureApplicationCostProps
> = ({ appName }) => {
  const { data: cost, status } = useGetFutureCostQuery({ appName });

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost forecast</Typography>
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
                {getPeriod()}
              </Typography>
            </div>

            <div className="grid grid--gap-small">
              <Typography variant="overline">Cost</Typography>
              <Typography group="input" variant="text">
                {getCostEstimate(cost)}
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

FutureApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
};
