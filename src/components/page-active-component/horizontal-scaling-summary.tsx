import { Accordion, Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { HorizontalScalingSummary as HorizontalScalingSummaryModel } from '../../store/radix-api';

export const HorizontalScalingSummary: FunctionComponent<
  HorizontalScalingSummaryModel
> = (data) => (
  <Accordion className="accordion elevated" chevronPosition="right">
    <Accordion.Item isExpanded>
      <Accordion.Header>
        <Accordion.HeaderTitle>
          <Typography className="whitespace-nowrap" variant="h4" as="span">
            Horizontal scaling
          </Typography>
        </Accordion.HeaderTitle>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid grid--gap-medium">
          <dl className="o-key-values">
            {!isNil(data.minReplicas) && (
              <>
                <Typography as="dt">Min replicas:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.minReplicas}
                </Typography>
              </>
            )}

            {!isNil(data.maxReplicas) && (
              <>
                <Typography as="dt">Max replicas:</Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.maxReplicas}
                </Typography>
              </>
            )}

            {!isNil(data.currentCPUUtilizationPercentage) && (
              <>
                <Typography as="dt">
                  CPU utilization, current average:
                </Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.currentCPUUtilizationPercentage}%
                </Typography>
              </>
            )}

            {!isNil(data.targetCPUUtilizationPercentage) && (
              <>
                <Typography as="dt">
                  CPU utilization, target average:
                </Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.targetCPUUtilizationPercentage}%
                </Typography>
              </>
            )}

            {!isNil(data.currentMemoryUtilizationPercentage) && (
              <>
                <Typography as="dt">
                  Memory utilization, current average:
                </Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.currentMemoryUtilizationPercentage}%
                </Typography>
              </>
            )}

            {!isNil(data.targetMemoryUtilizationPercentage) && (
              <>
                <Typography as="dt">
                  Memory utilization, target average:
                </Typography>
                <Typography as="dd" variant="body_short_bold">
                  {data.targetMemoryUtilizationPercentage}%
                </Typography>
              </>
            )}
          </dl>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

HorizontalScalingSummary.propTypes = {
  currentCPUUtilizationPercentage: PropTypes.number,
  currentMemoryUtilizationPercentage: PropTypes.number,
  maxReplicas: PropTypes.number,
  minReplicas: PropTypes.number,
  targetCPUUtilizationPercentage: PropTypes.number,
  targetMemoryUtilizationPercentage: PropTypes.number,
};
