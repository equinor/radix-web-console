import jdenticon from 'jdenticon';
import React from 'react';

import './style.css';

const badgeConfig = {
  hues: [207, 283, 64],
  lightness: {
    color: [0.45, 0.45],
    grayscale: [0.5, 0.75],
  },
  saturation: {
    color: 0.47,
    grayscale: 0.5,
  },
  backColor: '#ffffff00',
};

export const AppBadge = ({ appName, size = 64 }) => {
  const previousConfig = jdenticon.config;
  jdenticon.config = badgeConfig;

  const badge = {
    __html: jdenticon.toSvg(appName, size),
  };

  jdenticon.config = previousConfig;
  return <div className="app-badge" dangerouslySetInnerHTML={badge} />;
};

export default AppBadge;
