import React from 'react';

import DocumentTitle from '../document-title';
import CreateApplicationForm from '../create-application-form';

const clusterDomain = require('../../config.json').clusterDomain;

export const PageCreateApplication = () => {
  return (
    <React.Fragment>
      <DocumentTitle title="Create application" />
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">Create application</h1>
      </div>
      <main className="o-layout-page-content">
        <p>Alpha alert! This must be quite precise to work.</p>
        <p>
          <strong>GitHub repository</strong> is the full URL of the project
          repo. Example: <code>https://github.com/Statoil/my-project</code>
        </p>
        <p>
          <strong>Shared secret</strong> must be entered both here and on a
          GitHub webhook for the project.
        </p>
        <p>
          <strong>AD Groups</strong> is a list of Object IDs found in Azure AD.
          This grants access to resources related to hosting and building this
          application (e.g. access to its details in the Radix Web Console, or
          the underlying Kubernetes resources). If no group is provided, the app
          resources will be open for all developers. To create and manage AD
          groups, use{' '}
          <a href="https://idweb.statoil.net/IdentityManagement/default.aspx">
            idweb
          </a>
          . End user access needs to be controlled in the app itself, and is not
          related to these groups.
        </p>
        <p>
          <strong>Set up the webhook</strong>: In the GitHub project, go to
          Settings, Webhooks, Add webhook. On "Payload URL" enter{' '}
          <code>
            https://webhook-radix-webhook-prod.
            {clusterDomain}
          </code>
          , set "Content type" to <code>application/json</code>, enter the
          shared secret that you input into this form (anything works, it just
          has to match), and set to trigger on push.
        </p>
        <p>This process will be simpler in the future 😄</p>
        <CreateApplicationForm />
      </main>
    </React.Fragment>
  );
};

export default PageCreateApplication;
