import { ConfigureApplicationGithub } from '.';

export default (
  <div className="o-layout-single">
    <ConfigureApplicationGithub
      app={{
        adGroups: ['Group 1', 'Group 2'],
        name: 'a-name-thing',
        repository: 'https://some/path/to/a/repo',
        sharedSecret: 'a long shared secret',
        configBranch: 'configBranch',
        creator: 'creator',
        owner: 'owner',
        wbs: 'wbs123',
        radixConfigFullName: 'radixconfig.yaml',
      }}
      onDeployKeyChange={() => void 0}
      refetch={() => void 0}
      initialSecretPollInterval={5000}
    />
  </div>
);
