import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AppSummary from '../app-summary';
import { AppList } from '.';

var testApp = {
  metadata: {
    name: 'test-app',
  },
  spec: {
    components: componentList,
    environments: [{ name: 'test-dev' }, { name: 'test-prod' }],
  },
};
var testApp2 = {
  metadata: {
    name: 'test-app2',
  },
  spec: {
    components: componentList,
    environments: [{ name: 'test-dev2' }, { name: 'test-prod2' }],
  },
};

var componentList = [{ name: 'test-scenario' }];
var listOfApps = [testApp, testApp2];

describe('AppList component', () => {
  it('should render without error', () => {
    const wrapper = shallow(<AppList apps={listOfApps} />);
    expect(wrapper.length).toEqual(1);
  });
});
