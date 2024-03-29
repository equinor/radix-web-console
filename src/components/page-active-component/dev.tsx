import { HorizontalScalingSummary } from './horizontal-scaling-summary';

const testData: Array<Parameters<typeof HorizontalScalingSummary>[0]> = [
  {
    minReplicas: 4,
    maxReplicas: 20,
    currentCPUUtilizationPercentage: 13,
    targetCPUUtilizationPercentage: 37,
    currentMemoryUtilizationPercentage: 16,
    targetMemoryUtilizationPercentage: 30,
  },
  {
    minReplicas: 2,
    maxReplicas: 0,
    currentCPUUtilizationPercentage: 0,
    targetCPUUtilizationPercentage: 73,
    currentMemoryUtilizationPercentage: 19,
    targetMemoryUtilizationPercentage: 50,
  },
  {
    minReplicas: 1,
    maxReplicas: 6,
    currentCPUUtilizationPercentage: 0,
    targetCPUUtilizationPercentage: 0,
    currentMemoryUtilizationPercentage: 61,
    targetMemoryUtilizationPercentage: 62,
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
        <HorizontalScalingSummary {...x} />
      </div>
    ))}
  </>
);
