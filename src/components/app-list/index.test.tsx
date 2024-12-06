import { QueryStatus } from '@reduxjs/toolkit/query';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import AppList from '.';

import * as radixApi from '../../store/radix-api';
import store from '../../store/store';
import type { FetchQueryHookResult } from '../../store/types';

const noop = () => void 0;

describe('AppList component', () => {
  beforeEach(() => {
    vi.spyOn(radixApi, 'useShowApplicationsQuery');
    vi.spyOn(radixApi, 'useGetSearchApplicationsQuery');

    vi.mock('../../store/radix-api', async (importOriginal) => ({
      ...(await importOriginal<typeof radixApi>()),
      ...({
        useShowApplicationsQuery:
          (): FetchQueryHookResult<radixApi.ShowApplicationsApiResponse> => ({
            isError: false,
            isFetching: false,
            isLoading: false,
            isSuccess: true,
            isUninitialized: false,
            status: QueryStatus.fulfilled,
            // @ts-expect-error We dont care
            refetch: noop,
            data: [{ name: 'mock-app-1' }, { name: 'mock-app-2' }],
            currentData: [{ name: 'mock-app-1' }],
            error: undefined,
            fulfilledTimeStamp: 0,
          }),
        useGetSearchApplicationsQuery:
          (): FetchQueryHookResult<radixApi.GetSearchApplicationsApiResponse> => ({
            isError: false,
            isFetching: true,
            isLoading: true,
            isSuccess: false,
            isUninitialized: false,
            status: QueryStatus.pending,
            // @ts-expect-error We dont care
            refetch: noop,
            data: undefined,
          }),
      } as Record<keyof typeof radixApi, () => FetchQueryHookResult>),
    }));
  });

  it('should render without error', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppList />
        </MemoryRouter>
      </Provider>
    );
  });
});
