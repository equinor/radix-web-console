import React from 'react';

import Clickbox from '.';

export default (
  <div>
    <Clickbox>
      <div>This</div>
      <div>does</div>
      <div>nothing</div>
    </Clickbox>
    <hr />
    <Clickbox>
      <div>This</div>{' '}
      <a href="#1" onClick={() => alert(1)}>
        fires
      </a>{' '}
      <div>an</div>
      <div>alert</div>
    </Clickbox>
    <hr />
    <Clickbox>
      <div>This</div> <a href="/">navigates</a> <div>away</div>
    </Clickbox>
    <hr />
    <Clickbox>
      <div>This</div>{' '}
      <a href="#1" onClick={() => alert(1)}>
        fires
      </a>{' '}
      <a href="#2" onClick={() => alert(2)}>
        one
      </a>{' '}
      <a href="#3" onClick={() => alert(3)}>
        alert
      </a>{' '}
      <a href="/">only</a>
    </Clickbox>
  </div>
);
