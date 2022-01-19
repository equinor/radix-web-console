import { shallow } from 'enzyme';

import { AppList } from '.';

import { AsyncPollingStatus } from '../../effects/use-async-polling';
import { ApplicationSummaryModel } from '../../models/application-summary';
import { ProgressStatus } from '../../models/progress-status';
import { RequestState } from '../../state/state-utils/request-states';

const testResponse: ApplicationSummaryModel[] = [
  {
    name: 'test-app',
    latestJob: {
      triggeredBy: '',
      commitID: '32e42d8a5476701a48d046d6a3e8b72b05301841',
      created: new Date('2018-11-22T14:26:49+0000'),
      ended: new Date('2018-11-22T14:32:15+0000'),
      environments: ['prod', 'test'],
      name: 'radix-pipeline-13123123-fasd',
      pipeline: 'build-deploy',
      started: new Date('2018-11-22T14:26:49+0000'),
      status: ProgressStatus.Failed,
    },
  },
  {
    name: 'test-app-2',
    latestJob: {
      triggeredBy: '',
      commitID: '0184142d8a32e701a48d046d6a3e8b72b0535476',
      created: new Date('2018-11-22T14:26:49+0000'),
      ended: new Date('2018-11-22T14:32:15+0000'),
      environments: ['prod', 'qa'],
      name: 'radix-pipeline-13123123-hftd',
      pipeline: 'build-deploy',
      started: new Date('2018-11-22T14:26:49+0000'),
      status: ProgressStatus.Succeeded,
    },
  },
];

const noApps: string[] = [];
const appsResponse: AsyncPollingStatus<ApplicationSummaryModel[]> = {
  status: RequestState.SUCCESS,
  data: testResponse,
};

const noop = () => {};
const getApps = () => appsResponse;

describe('AppList component', () => {
  it('should render without error', () => {
    const wrapper = shallow(
      <AppList
        toggleFavouriteApplication={noop}
        setLastKnownApplicationNames={noop}
        pollApplicationsByNames={getApps}
        pollApplications={getApps}
        favouriteAppNames={noApps}
        lastKnownAppNames={noApps}
      />
    );
    expect(wrapper.length).toEqual(1);
  });
});
