import { Button, Icon, Typography } from '@equinor/eds-core-react'
import { error_outlined } from '@equinor/eds-icons'
import type { ComponentType } from 'react'
import { externalUrls } from '../../externalUrls'
import { Alert } from '.'

const testData: Array<ComponentType> = [
  () => <Alert>A simple alert</Alert>,
  () => <Alert type="info">Still a simple alert</Alert>,
  () => (
    <Alert>Job manager has been manually stopped; please note that new deployment will cause it to be restarted</Alert>
  ),
  () => (
    <Alert type="info">
      A simple alert with a{' '}
      <Typography link href="/">
        link with descenders aja aqa apa aga
      </Typography>
    </Alert>
  ),
  () => <Alert type="warning">A warning alert</Alert>,
  () => (
    <Alert type="warning">
      A warning alert with a{' '}
      <Typography link href="/">
        link
      </Typography>
    </Alert>
  ),
  () => <Alert type="danger">A danger alert</Alert>,
  () => (
    <Alert className="icon" type="danger">
      <span>
        <Icon data={error_outlined} /> A danger alert with a{' '}
        <Typography link href="/">
          link
        </Typography>{' '}
        and an icon.
      </span>
    </Alert>
  ),
  () => (
    <Alert type="danger" actions={<Button variant="contained">Delete environment</Button>}>
      This environment is orphaned; it is not defined in <strong>radixconfig.yaml</strong>
    </Alert>
  ),
  () => (
    <Alert type="danger">
      <Typography variant="h4">That didn't work 😞</Typography>
      <div>
        The error message was <samp>error_msg</samp>
      </div>
      <div>
        You may want to refresh the page. If the problem persists, get in touch on our Slack{' '}
        <Typography link href="/" rel="noopener noreferrer" target="_blank">
          support channel
        </Typography>
      </div>
    </Alert>
  ),
  () => (
    <Alert type="danger">
      <Typography variant="h4">That didn't work 😞</Typography>
      <div>
        Error subscribing to resource <code>some resource</code> with parameter <code>some parameter</code>
      </div>
      <div>
        The error message was <samp>error_msg</samp>
      </div>
      <div>
        You may want to refresh the page. If the problem persists, get in touch on our Slack{' '}
        <Typography link href="/" rel="noopener noreferrer" target="_blank">
          support channel
        </Typography>
      </div>
    </Alert>
  ),
  () => <Alert type="danger">Failed to regenerate deploy key and webhook secret. error_msg</Alert>,
  () => <Alert type="danger">Failed to create application. creation_error_msg</Alert>,
  () => (
    <Alert>
      Component has been manually stopped; please note that a new deployment will cause it to be restarted unless you
      set <code>replicas</code> of the component to <code>0</code> in{' '}
      <Typography link href={`${externalUrls.referenceRadixConfig}#replicas`}>
        radixconfig.yaml
      </Typography>
    </Alert>
  ),
  () => (
    <Alert className="gap-bottom" type="danger">
      Failed to change administrators. modify_error_msg
    </Alert>
  ),
  () => (
    <Alert type="danger">
      <Typography variant="h4">That didn't work 😞</Typography>
      <div>
        Error subscribing to resource <code>some_resource</code> with parameters <code>some_parameter</code>,{' '}
        <code>some_other_parameter</code>, <code>another_parameter</code>
      </div>
      <div>
        The error message was <samp>some_error_msg</samp>
      </div>
      <div>
        You may want to refresh the page. If the problem persists, get in touch on our Slack{' '}
        <Typography link>support channel</Typography>
      </div>
    </Alert>
  ),
]

export default (
  <div
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    <div
      className="grid grid--gap-large"
      style={{
        margin: '0 auto',
      }}
    >
      {testData.map((Element, i) => (
        <Element key={i} />
      ))}
    </div>
  </div>
)
