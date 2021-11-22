import { Icon } from '@equinor/eds-core-react';
import {
  check,
  error_outlined,
  help_outline,
  pause_circle_outlined,
  placeholder_icon,
  settings,
} from '@equinor/eds-icons';
import * as ReactDOM from 'react-dom';

import defaultEntry from './init/entry-default';
import { routes } from './routes';

import './style.css';

Icon.add({
  check,
  error_outlined,
  help_outline,
  pause_circle_outlined,
  placeholder_icon,
  settings,
});

const path = window.location.pathname;

const fetchRoot = async (): Promise<JSX.Element> => {
  if (RegExp(`^${routes.devComponent}`).test(path)) {
    const root = await import(
      /* webpackChunkName: 'dev-component' */ './init/entry-dev-component'
    );
    return root.default;
  } else if (RegExp(`^${routes.devIntegration}`).test(path)) {
    const root = await import(
      /* webpackChunkName: 'dev-integration' */ './init/entry-dev-integration'
    );
    return root.default;
  }

  return defaultEntry;
};

(async () => {
  const root = await fetchRoot();
  ReactDOM.render(root, document.getElementById('root'));
})();
