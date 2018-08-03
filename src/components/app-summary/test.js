import React from 'react';
import { shallow } from 'enzyme';

import AppSummary from '.';
import { EnvDetails } from './environment-details';

const componentList = [{ name: 'test-scenario' }];

describe('AppSummary component', () => {
  it('should render without error', () => {
    const testApp = {
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
    const testEnv = {
      name: 'test-env',
    };
    const wrapper = shallow(
      <EnvDetails env={testEnv} components={componentList} appName="test-app" />
    );
    expect(wrapper.length).toBe(1);
  });
});
