import { HorizontalScalingSummary } from './horizontal-scaling-summary';

const horizontalScalingSummaryProps = [
  {
    minReplicas: 4,
    maxReplicas: 20,
    currentCPUUtilizationPercentage: 13,
    targetCPUUtilizationPercentage: 37,
  },
  {
    minReplicas: 2,
    targetCPUUtilizationPercentage: 73,
  },
  {
    minReplicas: 1,
    maxReplicas: 6,
  },
];

export default (
  <>
    {horizontalScalingSummaryProps.map((prop, i) => (
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
        <HorizontalScalingSummary data={prop} />
      </div>
    ))}
  </>
);
