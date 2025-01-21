import { ConfigureApplicationGithub, ConfigureGithubWebhook } from '.';

export default (
  <div className="o-layout-single">
    <ConfigureApplicationGithub
      app={{
        adGroups: ['Group 1', 'Group 2'],
        adUsers: ['User 1', 'user 2'],
        readerAdGroups: ['Reader 1', 'Reader 2'],
        readerAdUsers: ['Reader User 1', 'Reader User 2'],
        name: 'a-name-thing',
        repository: 'https://some/path/to/a/repo',
        sharedSecret: 'a long shared secret',
        configBranch: 'configBranch',
        creator: 'creator',
        owner: 'owner',
        wbs: 'wbs123',
        radixConfigFullName: 'radixconfig.yaml',
      }}
    />
    <ConfigureGithubWebhook
      appName={'a-name-thing'}
      repository={'https://some/path/to/a/repo'}
      sharedSecret={crypto.randomUUID()}
    />
  </div>
);
