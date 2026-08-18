import { QueryStatus } from '@reduxjs/toolkit/query'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import type * as radixApi from '../../../../store/radix-api'
import store from '../../../../store/store'
import type { FetchQueryHookResult } from '../../../../store/types'
import { useApplications } from '../../hooks/useApplications'
import { ApplicationsOverview } from './ApplicationsOverview'

const noop = () => void 0

vi.mock('../../store/radix-api', async (importOriginal) => ({
  ...(await importOriginal<typeof radixApi>()),
  ...({
    useShowApplicationsQuery: (): FetchQueryHookResult<radixApi.ShowApplicationsApiResponse> => ({
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
    useGetSearchApplicationsQuery: (): FetchQueryHookResult<radixApi.GetSearchApplicationsApiResponse> => ({
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
}))

vi.mock('./hooks/useApplications')

const mockedUseApplications = vi.mocked(useApplications)

const baseApplicationsState: ReturnType<typeof useApplications> = {
  applicationNames: [],
  hasLoadedOnce: true,
  isRefreshing: false,
  isError: false,
  error: undefined,
  refresh: noop,
}

const renderOverview = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ApplicationsOverview />
      </MemoryRouter>
    </Provider>
  )

describe('ApplicationsOverview component', () => {
  beforeEach(() => {
    mockedUseApplications.mockReturnValue(baseApplicationsState)
  })

  it('renders the applications the user has access to', () => {
    mockedUseApplications.mockReturnValue({ ...baseApplicationsState, applicationNames: ['alpha', 'beta'] })

    renderOverview()

    expect(screen.getByText('alpha')).toBeTruthy()
    expect(screen.getByText('beta')).toBeTruthy()
  })

  it('shows the empty state when there are no applications', () => {
    renderOverview()

    expect(screen.getByText('No applications yet')).toBeTruthy()
  })

  it('shows an error alert when loading applications fails', () => {
    mockedUseApplications.mockReturnValue({
      ...baseApplicationsState,
      isError: true,
      error: { status: 500, data: 'boom' },
    })

    renderOverview()

    expect(screen.getByText(/Failed to load applications/)).toBeTruthy()
  })
})
