import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { FunctionComponent } from 'react';
import { RouterProvider } from 'react-router-dom';

import { LazyLoadFallback } from '../lazy-load-fallback';
import { router } from '../../router';

import './style.css';

export const PageRoot: FunctionComponent = () => {
  useMsalAuthentication(InteractionType.Redirect);
  const { accounts } = useMsal();
  if (accounts.length === 0) {
    return <></>;
  }

  return (
    <div className="page-root">
      <div className="page-root-layout-base">
        <RouterProvider
          router={router}
          fallbackElement={<LazyLoadFallback />}
        />
      </div>
    </div>
  );
};

export default PageRoot;
