import React from 'react';
import { shallow } from 'enzyme';
import { AppList } from '.';

const componentList = [{ name: 'test-scenario' }];

const testApp = {
  metadata: {
    name: 'test-app',
  },
  spec: {
    components: componentList,
    environments: [{ name: 'test-dev' }, { name: 'test-prod' }],
  },
};

const testApp2 = {
  metadata: {
    name: 'test-app2',
  },
  spec: {
    components: componentList,
    environments: [{ name: 'test-dev2' }, { name: 'test-prod2' }],
  },
};

const listOfApps = [testApp, testApp2];

describe('AppList component', () => {
  it('should render without error', () => {
    const wrapper = shallow(<AppList apps={listOfApps} />);
    expect(wrapper.length).toEqual(1);
  });
});
