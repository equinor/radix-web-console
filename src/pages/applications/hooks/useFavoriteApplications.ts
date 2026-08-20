import {
  favouriteApplicationsKey as favoriteApplicationsKey,
  useMsalAccountLocalStorage,
} from '../../../hooks/use-local-storage'
import { pollingInterval } from '../../../store/defaults'
import { type ApplicationSummary, useGetSearchApplicationsQuery } from '../../../store/radix-api'
import { dataSorter, sortCompareString } from '../../../utils/sort-utils'
import { isArrayOfStrings } from '../../../utils/type-guards'

export interface FavoriteApplication {
  readonly name: string
  readonly details?: ApplicationSummary
  readonly isLoading: boolean
  readonly isDeleted: boolean
}

/**
 * Hook for managing favorite applications. Favorite applications are stored in local storage and can be fetched from the API for details.
 * The hook handles missing applications (i.e., applications that are no longer available in the API) by marking them as deleted.
 */
export const useFavoriteApplications = () => {
  const [favorites, setFavorites] = useMsalAccountLocalStorage<Array<string>>(
    favoriteApplicationsKey,
    [],
    isArrayOfStrings
  )

  const { data: fetchedApplications, ...fetchState } = useGetSearchApplicationsQuery(
    {
      apps: favorites?.join(','),
      includeEnvironments: true,
      includeLatestJobSummary: true,
    },
    { skip: favorites?.length === 0, pollingInterval }
  )

  const setFavorite = (appName: string, isFavorite: boolean) => {
    if (isFavorite) {
      setFavorites((old) => [...new Set([...old, appName])])
      return
    }
    setFavorites((old) => old.filter((favorite) => favorite !== appName))
  }

  const savedNames = dataSorter(favorites ?? [], [(a, b) => sortCompareString(a, b)])

  // Names are the source of truth from local storage. Details are fetched from
  // the API and may be missing when a local stored favorite no longer exists.
  const favoriteApplications: FavoriteApplication[] = savedNames.map((name) => {
    const details = fetchedApplications?.find((application) => application.name === name)

    // A just-added favorite has no details until the fetch settles, treat it as
    // loading, not deleted, while the request is still in flight.
    const isMissingDetails = !details
    const isLoading = isMissingDetails && (fetchState.isLoading || fetchState.isFetching)
    const isDeleted = isMissingDetails && fetchState.isSuccess

    return {
      name,
      details,
      isLoading,
      isDeleted,
    }
  })

  const isFavorite = (appName: string) => (favorites ?? []).includes(appName)

  return {
    favoriteApplications,
    isFavorite,
    setFavorite,
  }
}
