import React from 'react';
import { shallow } from 'enzyme';
import { AppList } from '.';

const testApp = {
  name: 'test-app',
  jobSummary: {
    name: 'radix-pipeline-13123123-fasd',
    appName: 'demoapp',
    branch: 'master',
    commitID: '32e42d8a5476701a48d046d6a3e8b72b05301841',
    started: '2018-11-22T14:26:49+0000',
    ended: '2018-11-22T14:32:15+0000',
    status: 'Failed',
  },
};

const testApp2 = {
  name: 'test-app-2',
  jobSummary: {
    name: 'radix-pipeline-13123123-hftd',
    appName: 'monster-app2',
    branch: 'master',
    commitID: '32e42d8a5476701a48d046d6a3e8b72b05301841',
    started: '2018-11-22T14:26:49+0000',
    ended: '2018-11-22T14:32:15+0000',
    status: 'Succeeded',
  },
};

const listOfApps = [testApp, testApp2];

describe('AppList component', () => {
  it('should render without error', () => {
    const wrapper = shallow(
      <AppList
        apps={listOfApps}
        subscribeApplications={() => {}}
        unsubscribeApplications={() => {}}
      />
    );
    expect(wrapper.length).toEqual(1);
  });
});
