import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { HorizontalScalingSummaryModelValidationMap } from '../../models/horizontal-scaling-summary';

export const HorizontalScalingSummary = ({ data }) => (
  <>
    {data && (
      <div className="grid grid--gap-medium">
        <Typography variant="h4">Horizontal scaling</Typography>
        <dl className="o-key-values">
          {data.minReplicas != null && (
            <>
              <Typography as="dt">Min replicas:</Typography>
              <Typography as="dd" variant="body_short_bold">
                {data.minReplicas}
              </Typography>
            </>
          )}

          {data.maxReplicas != null && (
            <>
              <Typography as="dt">Max replicas:</Typography>
              <Typography as="dd" variant="body_short_bold">
                {data.maxReplicas}
              </Typography>
            </>
          )}

          {data.currentCPUUtilizationPercentage != null && (
            <>
              <Typography as="dt">Current average CPU utilization:</Typography>
              <Typography as="dd" variant="body_short_bold">
                {data.currentCPUUtilizationPercentage}%
              </Typography>
            </>
          )}

          {data.targetCPUUtilizationPercentage != null && (
            <>
              <Typography as="dt">Target average CPU utilization:</Typography>
              <Typography as="dd" variant="body_short_bold">
                {data.targetCPUUtilizationPercentage}%
              </Typography>
            </>
          )}
        </dl>
      </div>
    )}
  </>
);

HorizontalScalingSummary.propTypes = {
  data: PropTypes.shape(HorizontalScalingSummaryModelValidationMap),
};

export default HorizontalScalingSummary;
