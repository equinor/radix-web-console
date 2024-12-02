import type React from 'react';
import { createRoot } from 'react-dom/client';

import defaultEntry from './init/entry-default';
import { routes } from './routes';

import './style.css';

async function fetchRoot(): Promise<React.JSX.Element> {
  const path = window.location.pathname;
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
}

// @ts-expect-error root element exists
const root = createRoot(document.getElementById('root'));
(async () => root.render(await fetchRoot()))();
