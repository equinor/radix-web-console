import { ApplicationRegistrationModel } from '.';

export const testData: Array<
  ApplicationRegistrationModel & {
    __testDescription: string;
    __testIsInvalidSample?: boolean;
  }
> = [
  {
    __testDescription: 'Without public key',
    adGroups: ['Group 1', 'Group 2'],
    name: 'name',
    repository: 'some/path/to/a/repo',
    sharedSecret: 'aSharedSecret',
    owner: 'a-user@equinor.com',
    machineUser: false,
    configBranch: 'some-config-branch',
    creator: 'i_made_this',
    wbs: 'flat_snix',
  },
  {
    __testDescription: 'With public key',
    adGroups: ['Group 1', 'Group 2'],
    name: 'a-name',
    repository: 'some/path/to/a/repo',
    sharedSecret: 'aSharedSecret',
    owner: 'a-user@equinor.com',
    machineUser: true,
    configBranch: 'another-config-branch',
    creator: 'this_i_made',
    wbs: 'snix_flat',
    publicKey: 'a-big-public-key',
  },
];
