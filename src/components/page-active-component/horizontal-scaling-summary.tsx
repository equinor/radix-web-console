import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  HorizontalScalingSummaryModel,
  HorizontalScalingSummaryModelValidationMap,
} from '../../models/horizontal-scaling-summary';
import { isNullOrUndefined } from '../../utils/object';

export interface HorizontalScalingSummaryProps {
  data?: HorizontalScalingSummaryModel;
}

export const HorizontalScalingSummary = ({
  data,
}: HorizontalScalingSummaryProps): JSX.Element => (
  <>
    {data && (
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
                {!isNullOrUndefined(data.minReplicas) && (
                  <>
                    <Typography as="dt">Min replicas:</Typography>
                    <Typography as="dd" variant="body_short_bold">
                      {data.minReplicas}
                    </Typography>
                  </>
                )}

                {!isNullOrUndefined(data.maxReplicas) && (
                  <>
                    <Typography as="dt">Max replicas:</Typography>
                    <Typography as="dd" variant="body_short_bold">
                      {data.maxReplicas}
                    </Typography>
                  </>
                )}

                {!isNullOrUndefined(data.currentCPUUtilizationPercentage) && (
                  <>
                    <Typography as="dt">
                      CPU utilization, current average:
                    </Typography>
                    <Typography as="dd" variant="body_short_bold">
                      {data.currentCPUUtilizationPercentage}%
                    </Typography>
                  </>
                )}

                {!isNullOrUndefined(data.targetCPUUtilizationPercentage) && (
                  <>
                    <Typography as="dt">
                      CPU utilization, target average:
                    </Typography>
                    <Typography as="dd" variant="body_short_bold">
                      {data.targetCPUUtilizationPercentage}%
                    </Typography>
                  </>
                )}

                {!isNullOrUndefined(
                  data.currentMemoryUtilizationPercentage
                ) && (
                  <>
                    <Typography as="dt">
                      Memory utilization, current average:
                    </Typography>
                    <Typography as="dd" variant="body_short_bold">
                      {data.currentMemoryUtilizationPercentage}%
                    </Typography>
                  </>
                )}

                {!isNullOrUndefined(data.targetMemoryUtilizationPercentage) && (
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
    )}
  </>
);

HorizontalScalingSummary.propTypes = {
  data: PropTypes.shape(HorizontalScalingSummaryModelValidationMap),
} as PropTypes.ValidationMap<HorizontalScalingSummaryProps>;
