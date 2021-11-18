import { configure, JdenticonConfig, toSvg } from 'jdenticon';

import './style.css';

export interface AppBadgeProps {
  appName: string;
  size?: number;
}

const badgeConfig: JdenticonConfig = {
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

export const AppBadge = ({
  size = 64,
  ...rest
}: AppBadgeProps): JSX.Element => {
  const previousConfig = configure();

  configure(badgeConfig);
  const badge = { __html: toSvg(rest.appName, size) };
  configure(previousConfig);

  return <div className="app-badge" dangerouslySetInnerHTML={badge} />;
};
