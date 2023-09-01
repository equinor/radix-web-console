import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { CostEstimateContent } from './cost-estimate-content';
import { useGetApplicationCostEstimate } from './use-get-application-cost-estimate';

import AsyncResource from '../async-resource/simple-async-resource';

import '../app-overview/style.css';

export interface FutureApplicationCostProps {
  appName: string;
}

export const FutureApplicationCost: FunctionComponent<
  FutureApplicationCostProps
> = ({ appName }) => {
  const [applicationCost] = useGetApplicationCostEstimate(appName);

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h6">Cost forecast</Typography>
      <div className="grid grid--gap-medium cost-section">
        <AsyncResource asyncState={applicationCost}>
          <CostEstimateContent applicationCost={applicationCost.data} />
        </AsyncResource>
      </div>
    </div>
  );
};

FutureApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
};
