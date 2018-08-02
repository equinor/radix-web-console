import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AppSummary from '.';
import { EnvDetails } from './environment-details';

describe('AppSummary component', () => {
  it('should render without error', () => {
    var testApp = {
      metadata: {
        name: 'test-app',
      },
      spec: {
        components: componentList,
        environments: [{ name: 'test-dev' }, { name: 'test-prod' }],
      },
    };
    const wrapper = shallow(<AppSummary app={testApp} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('EnvDetails component', () => {
  it('should render without error', () => {
    var componentList = [{ name: 'test-scenario' }];

    var testEnv = {
      name: 'test-env',
    };
    const wrapper = shallow(
      <EnvDetails env={testEnv} components={componentList} appName="test-app" />
    );
    expect(wrapper.length).toBe(1);
  });
});
