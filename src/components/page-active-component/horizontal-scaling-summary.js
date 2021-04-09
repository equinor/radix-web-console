import componentModel from '../../models/component';
import PropTypes from 'prop-types';
import React from 'react';

const HorizontalScalingSummary = (props) => {
  const { component } = props;
  return (
    <span>
      {component.horizontalScalingSummary && (
        <React.Fragment>
          <h2 className="o-heading-section">Horizontal scaling</h2>
          <dl className="o-key-values">
            <dt>Min replicas:</dt>
            <dd>{component.horizontalScalingSummary.minReplicas}</dd>
            <dt>Max replicas:</dt>
            <dd>{component.horizontalScalingSummary.maxReplicas}</dd>
            <dt>Current average CPU utilization:</dt>
            <dd>
              {
                component.horizontalScalingSummary
                  .currentCPUUtilizationPercentage
              }
              %
            </dd>
            <dt>Target average CPU utilization:</dt>
            <dd>
              {
                component.horizontalScalingSummary
                  .targetCPUUtilizationPercentage
              }
              %
            </dd>
          </dl>
        </React.Fragment>
      )}
    </span>
  );
};

HorizontalScalingSummary.propTypes = {
  component: PropTypes.shape(componentModel),
};

export default HorizontalScalingSummary;
