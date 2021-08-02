import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { error_outlined } from '@equinor/eds-icons';
import React from 'react';

import Alert from '.';

export default (
  <div
    style={{
      width: '80%',
      margin: '24px auto',
      display: 'grid',
      gap: '24px',
    }}
  >
    <Alert>A simple alert</Alert>
    <Alert type="info">Still a simple alert</Alert>
    <Alert>
      Job-scheduler has been manually stopped; please note that new deployment
      will cause it to be restarted
    </Alert>
    <Alert type="info">
      A simple alert with a <a href="/">link with descenders aja aqa apa aga</a>
    </Alert>
    <Alert type="warning">A warning alert</Alert>
    <Alert type="warning">
      A warning alert with a <a href="/">link</a>
    </Alert>
    <Alert type="danger">A danger alert</Alert>
    <Alert type="danger" className="icon">
      <Icon data={error_outlined} />
      <Typography>
        A danger alert with a <a href="/">link</a> and an icon.
      </Typography>
    </Alert>
    <Alert
      type="danger"
      actions={<Button variant="contained">Delete environment</Button>}
    >
      <p className="body_short">
        This environment is orphaned; it is not defined in{' '}
        <strong>radixconfig.yaml</strong>
      </p>
    </Alert>
    <Alert type="danger">
      <h2 className="o-heading-section">
        That didn't work{' '}
        <span role="img" aria-label="Sad">
          😞
        </span>
      </h2>
      <p>
        The error message was <samp>error_msg</samp>
      </p>
      <p>
        You may want to refresh the page. If the problem persists, get in touch
        on our Slack{' '}
        <a href={'/'} rel="noopener noreferrer" target="_blank">
          support channel
        </a>
      </p>
    </Alert>
    <Alert type="danger">
      <h2 className="o-heading-section o-heading--lean">
        That didn't work{' '}
        <span role="img" aria-label="Sad">
          😞
        </span>
      </h2>
      <p>
        Error subscribing to resource <code>some resource</code>
        <React.Fragment>
          {' '}
          with parameter{' '}
          <React.Fragment>
            <code>some parameter</code>
          </React.Fragment>
        </React.Fragment>
      </p>
      <p>
        The error message was <samp>error_msg</samp>
      </p>
      <p>
        You may want to refresh the page. If the problem persists, get in touch
        on our Slack{' '}
        <a href="/" rel="noopener noreferrer" target="_blank">
          support channel
        </a>
      </p>
    </Alert>
    <Alert type="danger">
      Failed to regenerate deploy key and webhook secret. error_msg
    </Alert>
    <Alert type="danger">
      Failed to create application. creation_error_msg
    </Alert>
    <Alert>
      Component has been manually stopped; please note that a new deployment
      will cause it to be restarted unless you set <code>replicas</code> of the
      component to <code>0</code> in{' '}
      <a href="https://www.radix.equinor.com/docs/reference-radix-config/#replicas">
        radixconfig.yaml
      </a>
    </Alert>
    <Alert type="danger" className="gap-bottom">
      Failed to change administrators. modify_error_msg
    </Alert>
  </div>
);
