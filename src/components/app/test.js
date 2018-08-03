import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';

import { shallow, mount, render } from 'enzyme';

import App from '.';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//     div
//   );
//   ReactDOM.unmountComponentAtNode(div);
// });

describe('App component', () => {
  it('should render without error', () => {
    expect(
      shallow(<App />)
        .find('main.o-layout-container')
        .exists()
    ).toBe(true);
  });
});
