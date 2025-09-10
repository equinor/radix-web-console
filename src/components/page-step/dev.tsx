import { PageStep } from '.'

export default (
  <>
    {['stepA', 'stepB'].map((x, i) => (
      <div key={i}>
        <PageStep appName="MyApp" stepName={x} jobName="MyJob" />
      </div>
    ))}
  </>
)
