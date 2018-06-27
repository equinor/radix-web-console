import React from 'react';
import { shallow } from 'enzyme';

import Button from '.';

describe('button', () => {
  it('renders without crashing', () => {
    shallow(<Button />);
  });

  it('renders child nodes', () => {
    const someContent = (
      <span>
        I'm a <i>button</i>!
      </span>
    );
    const wrapper = shallow(<Button>${someContent}</Button>);
    expect(wrapper.contains(someContent)).toEqual(true);
  });
});
