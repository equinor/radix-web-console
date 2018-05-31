import React from 'react';

import './style.css';

const Counter = ({ val, requestIncrement }) => (
  <div className="counter">
    <p className="counter__val">Current value: {val}</p>
    <button className="counter__inc" onClick={requestIncrement}>
      Increment
    </button>
  </div>
);

export default Counter;
