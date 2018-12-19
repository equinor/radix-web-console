import React from 'react';
import { shallow } from 'enzyme';

import LayoutApp from '.';

it('renders without crashing', () => {
  shallow(<LayoutApp />);
});
