import React from 'react';

import Button from '.';

export default (
  <div className="o-layout-container">
    <p>Enabled:</p>
    <Button btnType="default">Default</Button>
    <p>space</p>
    <Button btnType="primary">Primary</Button>
    <p>space</p>
    <Button btnType="danger">Danger</Button>
    <p>Disabled:</p>
    <Button disabled btnType="default">
      Default
    </Button>
    <p>space</p>
    <Button disabled btnType="primary">
      Primary
    </Button>
    <p>space</p>
    <Button disabled btnType="danger">
      Danger
    </Button>
  </div>
);
