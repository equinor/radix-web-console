import React from 'react';

import CreateApplicationForm from '../create-application-form';

export const PageCreateApplication = ({ requestCreate, isCreating }) => {
  return (
    <React.Fragment>
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">Create application</h1>
      </div>
      <main className="o-layout-page-content">
        <p>Alpha alert! This must be quite precise to work.</p>
        <p>
          <strong>Name</strong> must match the project name on GitHub.
        </p>
        <p>
          <strong>Repository</strong> is the browser URL to GitHub, e.g.
          "https://github.com/Statoil/my-app".
        </p>
        <p>
          <strong>Clone URL</strong> is obtained from GitHub's "clone with SSH"
          dialog and looks like "git@github.com:Statoil/my-app.git".
        </p>
        <p>
          <strong>Shared secret</strong> is a custom string, to be entered both
          here and on a GitHub webhook for the project. And "Private deploy key"
          is the private part of a key to be used in the GitHub project's deploy
          keys.
        </p>
        <p>
          <strong>Webhook</strong>: In the GitHub project, go to Settings,
          Webhooks, Add webhook, on Payload URL enter
          "http://webhook.playground-k8s-f-radixvalues-1.dev.radix.equinor.com/events/github",
          set Content type to "application/json", enter the shared secret that
          you will input into this form (anything works, it just has to match),
          and set the hook to trigger on push.
        </p>
        <p>
          <strong>Private deploy key</strong>: Generate a private/public key
          pair using this command:{' '}
          <code>ssh-keygen -t rsa -b 4096 -C "Radix deploy key"</code>. Paste
          the public part ("ssh-rsa …") on GitHub (Project, Settings, Deploy
          keys, Add) and the private part ("-----BEGIN RSA PRIVATE KEY …") on
          here.
        </p>
        <p>
          If adding fails, no error is shown (check the network tab on the
          browser).
        </p>
        <p>Yes, this will be made a lot simpler in the future.</p>
        <CreateApplicationForm
          requestCreate={requestCreate}
          isCreating={isCreating}
        />
      </main>
    </React.Fragment>
  );
};

export default PageCreateApplication;
