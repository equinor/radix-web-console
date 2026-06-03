import { StepPage } from './StepPage'

export default (
  <>
    {['stepA', 'stepB'].map((x, i) => (
      <div key={i}>
        <StepPage appName="MyApp" stepName={x} jobName="MyJob" />
      </div>
    ))}
  </>
)
