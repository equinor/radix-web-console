import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { useGetApplicationCostEstimate } from './use-get-application-cost-estimate';

import AsyncResource from '../async-resource/simple-async-resource';
import { ApplicationCostModel } from '../../models/cost-api/models/application-cost';
import { formatDateTimeYear } from '../../utils/datetime';

import '../application-cost/style.css';

function getCostEstimate({ cost, currency }: ApplicationCostModel): string {
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
  const [{ data: cost, ...state }] = useGetApplicationCostEstimate(appName);

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost forecast</Typography>
      <AsyncResource asyncState={state}>
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
