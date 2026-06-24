import type { HorizontalScalingSummary as HorizontalScalingSummaryModel } from '../../store/radix-api'
import { HorizontalScalingSummary } from './components/HorizontalScalingSummary'

const testData: Array<HorizontalScalingSummaryModel> = [
  {
    minReplicas: 4,
    maxReplicas: 20,
    currentReplicas: 5,
    desiredReplicas: 12,
    triggers: [],
  },
  {
    minReplicas: 2,
    maxReplicas: 0,
    currentReplicas: 3,
    desiredReplicas: 0,
    triggers: [],
  },
  {
    minReplicas: 1,
    maxReplicas: 6,
    currentReplicas: 2,
    desiredReplicas: 3,
    triggers: [],
  },
]

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
        <HorizontalScalingSummary summary={x} />
      </div>
    ))}
  </>
)
