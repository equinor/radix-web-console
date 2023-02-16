import { HorizontalScalingSummary } from './horizontal-scaling-summary';

import { HorizontalScalingSummaryModel } from '../../models/horizontal-scaling-summary';

const testData: Array<HorizontalScalingSummaryModel> = [
  {
    minReplicas: 4,
    maxReplicas: 20,
    currentCPUUtilizationPercentage: 13,
    targetCPUUtilizationPercentage: 37,
  },
  {
    minReplicas: 2,
    maxReplicas: 0,
    currentCPUUtilizationPercentage: 0,
    targetCPUUtilizationPercentage: 73,
  },
  {
    minReplicas: 1,
    maxReplicas: 6,
    currentCPUUtilizationPercentage: 0,
    targetCPUUtilizationPercentage: 0,
  },
];

export default (
  <>
    {testData.map((x, i) => (
      <div
        key={i}
        className="grid grid--gap-medium"
        style={{
          width: '35%',
          margin: '12px auto',
          padding: '12px',
          backgroundColor: 'var(--eds_ui_background__default)',
        }}
      >
        <HorizontalScalingSummary data={x} />
      </div>
    ))}
  </>
);
